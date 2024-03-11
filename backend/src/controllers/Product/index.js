const { default: mongoose } = require("mongoose");
const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");
const Category = require("../../models/Category");
const HotOffer = require("../../models/HotOffer");

const Product = require("../../models/Product");
const ProductAttribute = require("../../models/ProductAttribute");
const ProductImage = require("../../models/ProductImage");
const ProductSeller = require("../../models/ProductSeller");
const ProductStaticAttributes = require("../../models/ProductStaticAttributes");
const SuggestedProduct = require("../../models/SuggestedProducts");
const Seller = require("../../models/Seller");

const productController = {
  post: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        if (req.body.name === "") {
          res.status(400).send({ message: "نام نباید خالی باشد" });
          return null;
        }
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
        console.log("get list", req.query);
        let category = req.query.relatedCategory;
        let products = await Product.find({ relatedCategory: category })
          .sort("-created_date")
          .sort("ordering")
          .populate("relatedCategory");

        let subCats = await Category.find({ parent: category });
        await Promise.all(
          subCats.map(async (item) => {
            let foundSubCatPrs = await Product.find({
              relatedCategory: item._id,
            })
              .sort("-created_date")
              .sort("ordering")
              .populate("relatedCategory");
            let subSubCategories = await Category.find({ parent: item?._id });

            let subsubs = await Promise.all(
              subSubCategories.map(async (ssc) => {
                let foundSubSubCatPrs = await Product.find({
                  relatedCategory: ssc._id,
                })
                  .sort("-created_date")
                  .sort("ordering")
                  .populate("relatedCategory");
                return foundSubSubCatPrs;
              })
            );

            return [foundSubCatPrs, ...subsubs];
          })
        )
          .then((r) => {
            let list = r[0] ?? [];
            let subProducts = list[0] ?? [];
            let subSubProducts = list[1] ?? [];

            return [...products, ...subProducts, ...subSubProducts];
          })
          .then(async (categoryProducts) => {
            let output = categoryProducts;

            if (
              typeof req.query.seller === "string" &&
              req.query.seller?.length !== 2
            ) {
              let querySellers = JSON.parse(req.query.seller);

              let sellers = await Promise.all(
                querySellers.map(async (i) => {
                  return await Promise.all(
                    categoryProducts.map(async (item) => {
                      let productSellers = await ProductSeller.findOne({
                        relatedSeller: i,
                        relatedProduct: item._id,
                      }).populate("relatedProduct");
                      if (productSellers?._id) {
                        return item;
                      } else {
                      }
                    })
                  );
                })
              );

              let result = [];
              await Promise.all(
                sellers.map((item) => {
                  item.map((itm) => itm && result.push(itm));
                })
              );

              return result;
            } else {
              return output;
            }
          })
          .then((products) => {
            if (req.query?.search && req.query?.search?.length !== 0) {
              return products.filter((product) => {
                const texts = `${
                  product.name +
                  product.en_name +
                  product.relatedCategory?.name +
                  product?.relatedCategory?.en_name +
                  product.description +
                  product.en_description
                }`;
                return texts.search(req.query.search) !== -1;
              });
            } else {
              return products;
            }
          })
          .then(async (products) => {
            if (req.query?.city && req.query?.city?.length > 2) {
              let queryCitites = JSON.parse(req.query.city);

              let list = await Promise.all(
                queryCitites?.map(async (city) => {
                  let sellers = await Seller.find({ relatedCity: city });

                  return await Promise.all(
                    sellers.map(async (seller) => {
                      return await Promise.all(
                        products
                          .map(async (product) => {
                            let productSeller = await ProductSeller.findOne({
                              relatedProduct: product?._id,
                              relatedSeller: seller?._id,
                            });

                            if (productSeller?._id) {
                              return product;
                            }
                          })
                          .filter((itm) => itm)
                      );
                    })
                  );
                })
              );

              let output = [];
              await Promise.all(
                list.map((cities) => {
                  cities.map((prs) => {
                    prs.map((item) => item && output.push(item));
                  });
                })
              );

              return output;
            } else {
              return products;
            }
          })
          .then(async (products) => {
            if (req.query?.att && req.query?.att?.length > 2) {
              let queryAtts = JSON.parse(req.query?.att);
              let list = await Promise.all(
                queryAtts.map(async (att) => {
                  return await Promise.all(
                    products.map(async (product) => {
                      let productStaticAttributes =
                        await ProductStaticAttributes.findOne({
                          relatedProduct: product?._id,
                          relatedStaticAttribute: att,
                        });

                      if (productStaticAttributes?._id) {
                        return product;
                      }
                    })
                  );
                })
              );

              let output = [];
              await Promise.all(
                list.map((att) => {
                  att.map((product) => {
                    if (product) output.push(product);
                  });
                })
              );
              return output;
            } else {
              return products;
            }
          })
          .then(async (products) => {
            let output = [];
            // console.log(products);

            for (let i = 0; i < products.length; i++) {
              let hotOffer = await HotOffer.findOne({
                relatedProduct: products[i]?._id,
              });
              let image = await ProductImage.findOne({
                relatedProduct: products[i]?._id,
              });
              let sellers = await ProductSeller.count({
                relatedProduct: products[i]?._id,
              });
              let product = products[i].toJSON();
              output.push({
                ...product,
                image: image?.image ?? null,
                sellerCount: sellers,
                ...(hotOffer ? { offerPrice: hotOffer.offerPrice } : {}),
              });
            }

            return output;
          })
          .then((products) => {
            if (
              (req.query?.priceLte && req.query?.priceLte?.length !== 0) ||
              (req.query?.priceGte && req.query?.priceGte?.length)
            ) {
              return products.filter((item) => {
                const offerOrPrice =
                  !isNaN(Number(item?.offerPrice)) &&
                  item.offerPrice.length !== 0
                    ? Number(item?.offerPrice)
                    : !isNaN(Number(item.price))
                    ? Number(item.price)
                    : 0;

                if (req.query?.priceLte && req.query?.priceLte?.length !== 0) {
                  if (
                    req.query?.priceGte &&
                    req.query?.priceGte?.length !== 0
                  ) {
                    return (
                      offerOrPrice <= req.query.priceGte &&
                      offerOrPrice >= req.query.priceLte
                    );
                  } else {
                    return offerOrPrice >= Number(req.query.priceLte);
                  }
                } else {
                  if (
                    req.query?.priceGte &&
                    req.query?.priceGte?.length !== 0
                  ) {
                    return offerOrPrice <= req.query.priceGte;
                  } else {
                    return true;
                  }
                }
              });
            } else {
              return products;
            }
          })

          .then((products) => {
            return res.send({ result: products, count: products.length });
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
        const product = await Product.findById(id).populate("relatedCategory");
        const suggestedProducts = await SuggestedProduct.find({
          relatedProduct: id,
        }).populate({
          path: "suggestedProduct",
          model: "Product",
          populate: {
            path: "relatedCategory",
            model: "Category",
          },
        });
        if (product) {
          return res.send({
            result: product,
            suggestedProducts,
          });
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
        const suggestedProducts = await SuggestedProduct.find({
          relatedProduct: id,
        }).populate({
          path: "suggestedProduct",
          model: "Product",
          populate: {
            path: "relatedCategory",
            model: "Category",
          },
        });

        const hotOffer = await HotOffer.findOne({ relatedProduct: id });
        return res.send({
          product,
          productImages,
          productSellers,
          productAttributes,
          productStaticAttributes,
          suggestedProducts,
          hotOffer,
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
  createHotOffer: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        const product = await Product.findById(req.body.relatedProduct);
        if (product) {
          const foundHotOffer = await HotOffer.findOne({
            relatedProduct: req.body.relatedProduct,
          });
          if (foundHotOffer) {
            await foundHotOffer.deleteOne({ _id: foundHotOffer._id });
          }
          const hotOffer = new HotOffer({
            created_date: new Date(),
            from_date: new Date(req.body.from_date),
            to_date: new Date(req.body.to_date),
            relatedProduct: req.body.relatedProduct,
            isActive: true,
            offerPrice: req.body.offerPrice,
          });
          await hotOffer.save();

          return res.send({ result: hotOffer });
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
  getHotOfferList: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        const category = req.query.category;
        const today = new Date();
        const foundOffers = await HotOffer.find().populate({
          path: "relatedProduct",
          model: "Product",
          populate: {
            path: "relatedCategory",
            model: "Category",
          },
        });

        Promise.all(
          foundOffers
            .filter(
              (item) =>
                new Date(item.from_date).getTime() < today.getTime() &&
                today.getTime() < new Date(item.to_date).getTime() &&
                item?.relatedProduct?.relatedCategory?.id === category
            )
            .map(async (item) => {
              let image = await ProductImage.findOne({
                relatedProduct: item.relatedProduct?._id,
              });

              return {
                ...item.relatedProduct.toJSON(),
                offerPrice: item.offerPrice,
                image: image?.image ?? null,
              };
            })
        ).then((r) => {
          res.send({
            result: r,
          });
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
};

module.exports = productController;
