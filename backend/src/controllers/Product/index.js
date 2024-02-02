const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const Product = require("../../models/Product");
const ProductAttribute = require("../../models/ProductAttribute");
const ProductImage = require("../../models/ProductImage");
const ProductSeller = require("../../models/ProductSeller");
const ProductStaticAttributes = require("../../models/ProductStaticAttributes");

const productController = {
  post: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let product = new Product({
          name: req.body.name,
          en_name: req.body.en_name,
          description: req.body.description,
          en_description: req.body.en_description,
          price: req.body.price,
          showPrice: req.body.showPrice,
          isActive: req.body.isActive,
          created_date: new Date(),
          offerPrice: req.body.offerPrice,
          relatedCategory: req.body.relatedCategory,
        });
        await product.save();
        if (process.env.NODE_ENV !== "production") {
          console.log(product);
        }
        return res.send({ result: product });
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
        let output = [];
        let products = await Product.find(req.query)
          .sort("-created_date")
          .sort("ordering")
          .populate("relatedCategory");

        for (let i = 0; i < products.length; i++) {
          let image = await ProductImage.findOne({
            relatedProduct: products[i]?._id,
          });
          let sellers = await ProductSeller.count({
            relatedProduct: products[i]?._id,
          });
          let product = products[i]?.toJSON();
          output.push({
            ...product,
            image: image?.image ?? null,
            sellerCount: sellers,
          });
        }

        res.send({
          result: output,
          count: products.length,
        });
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
        const product = await Product.findById(id);
        if (product) {
          return res.send(
            await baseResults(Product, "id", req.params, false, [
              "relatedCategory",
            ])
          );
        } else {
          res.status(404).send({ message: "There is no Product with this id" });
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
  getDetailForEdit: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let id = req.params.id;
        const product = await Product.findById(id);

        if (!product)
          return res
            .status(404)
            .send({ message: "محصولی با این شناسه پیدا نشد" });
        const productImages = await ProductImage.find({ relatedProduct: id });
        const productSellers = await ProductSeller.find({
          relatedProduct: id,
        }).populate("relatedSeller");
        const productStaticAttributes = await ProductStaticAttributes.find({
          relatedProduct: id,
        }).populate("relatedStaticAttribute");
        const productAttributes = await ProductAttribute.find({
          relatedProduct: id,
        });

        return res.send({
          product,
          productImages,
          productSellers,
          productAttributes,
          productStaticAttributes,
        });
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
        const product = await Product.findById(id);
        if (product) {
          let keys = Object.keys(req.body);
          keys.map((item) => (product[item] = req.body[item]));
          const updatedProduct = await product.save();
          if (updatedProduct) {
            return res.send({ result: updatedProduct });
          } else {
            return res
              .status(500)
              .send({ message: "Error in updating Product" });
          }
        } else {
          return res
            .status(404)
            .send({ message: "There is no Product with this id" });
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
        const product = await Product.findById(req.params.id);
        if (product) {
          await product.deleteOne({ _id: req.params.id });
          res.send({ message: "Product Deleted" });
        } else {
          res.status(404).send({ message: "Product Not Found" });
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

module.exports = productController;
