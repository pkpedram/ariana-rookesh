const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const ProductSeller = require("../../models/ProductSeller");

const productSellerController = {
  post: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let productSeller = new ProductSeller({
          relatedProduct: req.body.relatedProduct,
          relatedSeller: req.body.relatedSeller,
          isActive: req.body.isActive,
          created_date: new Date(),
        });
        await productSeller.save();
        if (process.env.NODE_ENV !== "production") {
          console.log(productSeller);
        }
        return res.send({ result: productSeller });
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
        let result = await ProductSeller.find(req.query)
          .populate(["relatedProduct", "relatedSeller"].join(" "))
          .sort("-created_date")
          .sort("ordering")
          .populate({
            path: "relatedSeller",
            populate: {
              path: "relatedCity",
              model: "City",
            },
          });
        //   .populate("relatedCity");
        res.send(
          //   await baseResults(ProductSeller, "list", req.query, true, [
          //     "relatedProduct",
          //     "relatedSeller",
          //   ])
          {
            result: result,
            count: 0,
          }
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
        const productSeller = await ProductSeller.findById(id);
        if (productSeller) {
          return res.send(
            await baseResults(ProductSeller, "id", req.params, false, [
              "relatedProduct",
              "relatedSeller",
            ])
          );
        } else {
          res
            .status(404)
            .send({ message: "There is no ProductSeller with this id" });
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
        const productSeller = await ProductSeller.findById(id);
        if (productSeller) {
          let keys = Object.keys(req.body);
          keys.map((item) => (productSeller[item] = req.body[item]));
          const updatedProductSeller = await productSeller.save();
          if (updatedProductSeller) {
            return res.send({ result: updatedProductSeller });
          } else {
            return res
              .status(500)
              .send({ message: "Error in updating ProductSeller" });
          }
        } else {
          return res
            .status(404)
            .send({ message: "There is no ProductSeller with this id" });
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
        const productSeller = await ProductSeller.findById(req.params.id);
        if (productSeller) {
          await productSeller.deleteOne({ _id: req.params.id });
          res.send({ message: "ProductSeller Deleted" });
        } else {
          res.status(404).send({ message: "ProductSeller Not Found" });
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

module.exports = productSellerController;
