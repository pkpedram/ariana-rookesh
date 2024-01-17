const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const ContactUsFormCategory = require("../../models/ContactUsFormCategory");

const contactUsFormCategoryController = {
  post: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let contactUsFormCategory = new ContactUsFormCategory({
          title: req.body.title,
          en_title: req.body.en_title,
          ordering: req.body.ordering,
          isActive: req.body.isActive,
          created_date: new Date(),
        });
        await contactUsFormCategory.save();
        if (process.env.NODE_ENV !== "production") {
          console.log(contactUsFormCategory);
        }
        return res.send({ result: contactUsFormCategory });
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  getList: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        res.send(
          await baseResults(ContactUsFormCategory, "list", req.query, true, [])
        );
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  getDetail: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let id = req.params.id;
        const contactUsFormCategory = await ContactUsFormCategory.findById(id);
        if (contactUsFormCategory) {
          return res.send(
            await baseResults(
              ContactUsFormCategory,
              "id",
              req.params,
              false,
              []
            )
          );
        } else {
          res
            .status(404)
            .send({
              message: "There is no ContactUsFormCategory with this id",
            });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  put: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let id = req.params.id;
        const contactUsFormCategory = await ContactUsFormCategory.findById(id);
        if (contactUsFormCategory) {
          let keys = Object.keys(req.body);
          keys.map((item) => (contactUsFormCategory[item] = req.body[item]));
          const updatedContactUsFormCategory =
            await contactUsFormCategory.save();
          if (updatedContactUsFormCategory) {
            return res.send({ result: updatedContactUsFormCategory });
          } else {
            return res
              .status(500)
              .send({ message: "Error in updating ContactUsFormCategory" });
          }
        } else {
          return res
            .status(404)
            .send({
              message: "There is no ContactUsFormCategory with this id",
            });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  delete: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        const contactUsFormCategory = await ContactUsFormCategory.findById(
          req.params.id
        );
        if (contactUsFormCategory) {
          await contactUsFormCategory.deleteOne({ _id: req.params.id });
          res.send({ message: "ContactUsFormCategory Deleted" });
        } else {
          res.status(404).send({ message: "ContactUsFormCategory Not Found" });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
};

module.exports = contactUsFormCategoryController;
