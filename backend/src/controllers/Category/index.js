const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const Category = require("../../models/Category");

const categoryController = {
  post: {
    middlewares: [
      authenticateJwtToken(["admin"]),
      upload("category").fields([
        { name: "banner", maxCount: 1 },
        { name: "icon", maxCount: 1 },
        // { name: "catalog", maxCount: 1 },
        { name: "aboutUsImage", maxCount: 1 },
      ]),
    ],
    controller: async (req, res, next) => {
      try {
        let category = new Category({
          name: req.body.name,
          en_name: req.body.en_name,
          showOnHomePage: req.body.showOnHomePage,
          slug: req.body.slug,
          showProductPrices: req.body.showProductPrices,
          ...(req.body.parent ? { parent: req.body.parent ?? null } : {}),
          banner: req.files.banner
            ? generateFileName(req.files.banner[0], "category")
            : null,
          icon: req.files.icon
            ? generateFileName(req.files.icon[0], "category")
            : null,
          // catalog: req.files.catalog
          //   ? generateFileName(req.files.catalog[0], "category")
          //   : null,
          isActive: req.body.isActive ?? true,
          created_date: new Date(),
          description: req.body.description,
          en_description: req.body.en_description,
          aboutUsImage: req.files.aboutUsImage
            ? generateFileName(req.files.aboutUsImage[0], "category")
            : null,
        });
        await category.save();
        if (process.env.NODE_ENV !== "production") {
          console.log(category);
        }
        return res.send({ result: category });
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
        return res.send(
          await baseResults(Category, "list", req.query, true, ["parent"])
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
        const category = await Category.findById(id);
        if (category) {
          return res.send(
            await baseResults(Category, "id", req.params, false, [])
          );
        } else {
          res
            .status(404)
            .send({ message: "There is no Category with this id" });
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
    middlewares: [
      authenticateJwtToken(["admin"]),
      upload("category").fields([
        { name: "banner", maxCount: 1 },
        { name: "icon", maxCount: 1 },
        { name: "aboutUsImage", maxCount: 1 },
        // { name: "catalog", maxCount: 1 },
      ]),
    ],
    controller: async (req, res, next) => {
      try {
        let id = req.params.id;
        const category = await Category.findById(id);
        if (category) {
          category.banner = req.files.banner
            ? generateFileName(req.files.banner[0], "category")
            : category.banner === null
            ? null
            : category.banner;
          category.icon = req.files.icon
            ? generateFileName(req.files.icon[0], "category")
            : category.icon;
          category.aboutUsImage = req.files.aboutUsImage
            ? generateFileName(req.files.aboutUsImage[0], "category")
            : category.aboutUsImage;

          let keys = Object.keys(req.body);
          keys.map((item) => (category[item] = req.body[item]));
          const updatedCategory = await category.save();
          if (updatedCategory) {
            return res.send({ result: updatedCategory });
          } else {
            return res
              .status(500)
              .send({ message: "Error in updating Category" });
          }
        } else {
          return res
            .status(404)
            .send({ message: "There is no Category with this id" });
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
        const category = await Category.findById(req.params.id);
        if (category) {
          await category.deleteOne({ _id: req.params.id });
          res.send({ message: "Category Deleted" });
        } else {
          res.status(404).send({ message: "Category Not Found" });
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

module.exports = categoryController;
