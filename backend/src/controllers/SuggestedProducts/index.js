const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");
const Product = require("../../models/Product");

const SuggestedProduct = require("../../models/SuggestedProducts");

const suggestedProductController = {
  post: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        const relatedProduct = await Product.findById(req.body.relatedProduct);
        const suggestedProductinBody = await Product.findById(
          req.body.suggestedProduct
        );
        if (relatedProduct) {
          if (suggestedProductinBody) {
            const suggestedProduct = new SuggestedProduct({
              created_date: new Date(),
              isActive: req.body.isActive ?? true,
              relatedProduct: req.body.relatedProduct,
              suggestedProduct: req.body.suggestedProduct,
            });
            await suggestedProduct.save();
            if (process.env.NODE_ENV !== "production") {
              console.log(suggestedProduct);
            }
            return res.send({ result: suggestedProduct });
          } else {
            res.status(404).send({ message: "محصول پیشنهادی پیدا نشد" });
          }
        } else {
          res.status(404).send({ message: "محصول پیدا نشد." });
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
        const productAttribute = await SuggestedProduct.findById(req.params.id);
        if (productAttribute) {
          await productAttribute.deleteOne({ _id: req.params.id });
          res.send({ message: "SuggestedProduct Deleted" });
        } else {
          res.status(404).send({ message: "SuggestedProduct Not Found" });
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

module.exports = suggestedProductController;
