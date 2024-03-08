const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");
const User = require("../../models/User");
const Seen = require("../../models/Seen");
const ContactUsForm = require("../../models/ContactUsForm");
const Product = require("../../models/Product");
const BlogPost = require("../../models/BlogPost");
const Notification = require("../../models/Notification");
const Catalogue = require("../../models/Catalogue");

const publicController = {
  getNotification: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        return res.send(await baseResults(Notification, "list", {}, true));
      } catch (error) {
        res.status(500).send({
          message: "خطایی هست که نمیدونیم چیه لطفا تا آپدیت بعدی شکیبا باشید.",
        });
      }
    },
  },
  generalStats: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let userCount = await User.count();
        let seenCount = await Seen.count();
        let contactUsCont = await ContactUsForm.count();
        let productsCount = await Product.count();
        let blogPostCount = await BlogPost.count();
        res.send({
          userCount: userCount,
          seenCount: seenCount,
          contactUsCount: contactUsCont,
          productsCount: productsCount,
          blogPostCount: blogPostCount,
        });
      } catch (error) {
        res.status(500).send({
          message: "خطایی هست که نمیدونیم چیه لطفا تا آپدیت بعدی شکیبا باشید.",
        });
      }
    },
  },
  postSeen: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        let seen = new Seen({
          created_date: new Date().toJSON(),
        });
        await seen.save();

        res.sendStatus(200);
      } catch (error) {
        res.status(500).send({
          message: "خطایی هست که نمیدونیم چیه لطفا تا آپدیت بعدی شکیبا باشید.",
        });
      }
    },
  },
  getSeenList: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        // res.send(await baseResults(Seen, 'list', req.query, false, []))
        let seen = await Seen.find(req.query);
        let list = [];

        await seen.map((item) => {
          if (
            !list.includes(new Date(item.created_date).toJSON().split("T")[0])
          ) {
            list.push(new Date(item.created_date).toJSON().split("T")[0]);
          }
        });

        let result = [];
        await list.map((item) => {
          result.push([
            item,
            seen.filter(
              (itm) => new Date(itm.created_date).toJSON().split("T")[0] == item
            ).length,
          ]);
        });

        return await res.send({
          result: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          message: "خطایی هست که نمیدونیم چیه لطفا تا آپدیت بعدی شکیبا باشید.",
        });
      }
    },
  },
  postCatalogue: {
    middlewares: [
      authenticateJwtToken(["admin"]),
      upload("public__Catalogue").fields([{ name: "file", maxCount: 1 }]),
    ],
    controller: async (req, res, next) => {
      try {
        const catalogue = new Catalogue({
          created_date: new Date(),
          isActive: true,
          title: req.body.title,
          en_title: req.body.en_title,
          file: req?.files?.file
            ? generateFileName(req.files.file[0], "generalSetting")
            : null,
        });

        await catalogue.save();
        return res.send({ result: catalogue });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          message: "خطایی هست که نمیدونیم چیه لطفا تا آپدیت بعدی شکیبا باشید.",
        });
      }
    },
  },
  deleteCatalogue: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        const ct = await Catalogue.findById(req.params.id);
        if (ct) {
          await ct.deleteOne({ _id: req.params.id });
          res.send({ message: "Catalogue Deleted" });
        } else {
          res.status(404).send({ message: "Catalogue Not Found" });
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
  getCatalogueList: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        res.send(await baseResults(Catalogue, "list", req.query, true, []));
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

module.exports = publicController;
