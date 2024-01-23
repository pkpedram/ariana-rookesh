const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const ContactUsForm = require("../../models/ContactUsForm");
const Notification = require("../../models/Notification");

const contactUsFormController = {
  post: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let contactUsForm = new ContactUsForm({
          relatedContactUsFormCategory: req.body.relatedContactUsFormCategory,
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber,
          companyName: req.body.companyName,
          relatedProductCategory: req.body.relatedProductCategory,
          message: req.body.message,
          isActive: req.body.isActive,
          created_date: new Date(),
        });
        await contactUsForm.save();
        let notif = new Notification({
          created_date: new Date(),
          public: true,
          link: "/forms",
          text: `فردی به نام ${req.body?.fullName} با شماره تلفن ${req.body?.phoneNumber} فرم درخواست تماس را پر کرده است.`,
          type: "info",
        });
        await notif.save();
        if (process.env.NODE_ENV !== "production") {
          console.log(contactUsForm);
        }
        return res.send({ result: contactUsForm });
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
          await baseResults(ContactUsForm, "list", req.query, true, [
            "relatedContactUsFormCategory",
            "relatedProductCategory",
          ])
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
        const contactUsForm = await ContactUsForm.findById(id);
        if (contactUsForm) {
          return res.send(
            await baseResults(ContactUsForm, "id", req.params, false, [
              "relatedContactUsFormCategory",
              "relatedProductCategory",
            ])
          );
        } else {
          res
            .status(404)
            .send({ message: "There is no ContactUsForm with this id" });
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
        const contactUsForm = await ContactUsForm.findById(id);
        if (contactUsForm) {
          let keys = Object.keys(req.body);
          keys.map((item) => (contactUsForm[item] = req.body[item]));
          const updatedContactUsForm = await contactUsForm.save();
          if (updatedContactUsForm) {
            return res.send({ result: updatedContactUsForm });
          } else {
            return res
              .status(500)
              .send({ message: "Error in updating ContactUsForm" });
          }
        } else {
          return res
            .status(404)
            .send({ message: "There is no ContactUsForm with this id" });
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
        const contactUsForm = await ContactUsForm.findById(req.params.id);
        if (contactUsForm) {
          await contactUsForm.deleteOne({ _id: req.params.id });
          res.send({ message: "ContactUsForm Deleted" });
        } else {
          res.status(404).send({ message: "ContactUsForm Not Found" });
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

module.exports = contactUsFormController;
