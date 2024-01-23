const usersController = require("../controllers/user");

const contactUsFormCategoryController = require("../controllers/ContactUsFormCategory");
const categoryController = require("../controllers/Category");
const contactUsFormController = require("../controllers/ContactUsForm");
const provinceController = require("../controllers/Province");
const cityController = require("../controllers/City");
const staticAttributeController = require("../controllers/StaticAttribute");
const productController = require("../controllers/Product");
const productAttributeController = require("../controllers/ProductAttribute");
const productStaticAttributesController = require("../controllers/ProductStaticAttributes");
const productImageController = require("../controllers/ProductImage");
const sellerController = require("../controllers/Seller");
const productSellerController = require("../controllers/ProductSeller");
const blogCategoryController = require("../controllers/BlogCategory");
const blogPostController = require("../controllers/BlogPost");
const generalSettingController = require("../controllers/GeneralSetting");
const publicController = require("../controllers/Public");

let routes = [
  // {
  //     route: '',
  //     type: '',
  //     middlewares: ,
  //     controller: ,
  // }
  {
    route: "/notification",
    type: "get",
    middlewares: publicController["getNotification"]["middlewares"],
    controller: publicController["getNotification"]["controller"],
  },
  {
    route: "/register/admin",
    type: "post",
    middlewares: usersController["postAdmin"]["middlewares"],
    controller: usersController["postAdmin"]["controller"],
  },
  {
    route: "/admin/users",
    type: "get",
    middlewares: usersController["getUsers"]["middlewares"],
    controller: usersController["getUsers"]["controller"],
  },
  {
    route: "/admin/user/:id",
    type: "delete",
    middlewares: usersController["delete"]["middlewares"],
    controller: usersController["delete"]["controller"],
  },
  {
    route: "/admin/user/:id",
    type: "put",
    middlewares: usersController["put"]["middlewares"],
    controller: usersController["put"]["controller"],
  },
  {
    route: "/register",
    type: "post",
    middlewares: usersController["postBasic"]["middlewares"],
    controller: usersController.postBasic.controller,
  },
  {
    route: "/login",
    type: "post",
    middlewares: usersController["login"]["middlewares"],
    controller: usersController["login"]["controller"],
  },
  {
    route: "/login/admin",
    type: "post",
    middlewares: usersController["loginAdmin"]["middlewares"],
    controller: usersController["loginAdmin"]["controller"],
  },

  {
    route: "/contactUsFormCategory",
    type: "post",
    middlewares: contactUsFormCategoryController["post"]["middlewares"],
    controller: contactUsFormCategoryController["post"]["controller"],
  },
  {
    route: "/contactUsFormCategory",
    type: "get",
    middlewares: contactUsFormCategoryController["getList"]["middlewares"],
    controller: contactUsFormCategoryController["getList"]["controller"],
  },
  {
    route: "/contactUsFormCategory/:id",
    type: "get",
    middlewares: contactUsFormCategoryController["getDetail"]["middlewares"],
    controller: contactUsFormCategoryController["getDetail"]["controller"],
  },
  {
    route: "/contactUsFormCategory/:id",
    type: "put",
    middlewares: contactUsFormCategoryController["put"]["middlewares"],
    controller: contactUsFormCategoryController["put"]["controller"],
  },
  {
    route: "/contactUsFormCategory/:id",
    type: "delete",
    middlewares: contactUsFormCategoryController["delete"]["middlewares"],
    controller: contactUsFormCategoryController["delete"]["controller"],
  },
  {
    route: "/category",
    type: "post",
    middlewares: categoryController["post"]["middlewares"],
    controller: categoryController["post"]["controller"],
  },
  {
    route: "/category",
    type: "get",
    middlewares: categoryController["getList"]["middlewares"],
    controller: categoryController["getList"]["controller"],
  },
  {
    route: "/category/:id",
    type: "get",
    middlewares: categoryController["getDetail"]["middlewares"],
    controller: categoryController["getDetail"]["controller"],
  },
  {
    route: "/category/:id",
    type: "put",
    middlewares: categoryController["put"]["middlewares"],
    controller: categoryController["put"]["controller"],
  },
  {
    route: "/category/:id",
    type: "delete",
    middlewares: categoryController["delete"]["middlewares"],
    controller: categoryController["delete"]["controller"],
  },
  {
    route: "/contactUsForm",
    type: "post",
    middlewares: contactUsFormController["post"]["middlewares"],
    controller: contactUsFormController["post"]["controller"],
  },
  {
    route: "/contactUsForm",
    type: "get",
    middlewares: contactUsFormController["getList"]["middlewares"],
    controller: contactUsFormController["getList"]["controller"],
  },
  {
    route: "/contactUsForm/:id",
    type: "get",
    middlewares: contactUsFormController["getDetail"]["middlewares"],
    controller: contactUsFormController["getDetail"]["controller"],
  },
  {
    route: "/contactUsForm/:id",
    type: "put",
    middlewares: contactUsFormController["put"]["middlewares"],
    controller: contactUsFormController["put"]["controller"],
  },
  {
    route: "/contactUsForm/:id",
    type: "delete",
    middlewares: contactUsFormController["delete"]["middlewares"],
    controller: contactUsFormController["delete"]["controller"],
  },
  {
    route: "/province",
    type: "post",
    middlewares: provinceController["post"]["middlewares"],
    controller: provinceController["post"]["controller"],
  },
  {
    route: "/province",
    type: "get",
    middlewares: provinceController["getList"]["middlewares"],
    controller: provinceController["getList"]["controller"],
  },
  {
    route: "/province/:id",
    type: "get",
    middlewares: provinceController["getDetail"]["middlewares"],
    controller: provinceController["getDetail"]["controller"],
  },
  {
    route: "/province/:id",
    type: "put",
    middlewares: provinceController["put"]["middlewares"],
    controller: provinceController["put"]["controller"],
  },
  {
    route: "/province/:id",
    type: "delete",
    middlewares: provinceController["delete"]["middlewares"],
    controller: provinceController["delete"]["controller"],
  },
  {
    route: "/city",
    type: "post",
    middlewares: cityController["post"]["middlewares"],
    controller: cityController["post"]["controller"],
  },
  {
    route: "/city",
    type: "get",
    middlewares: cityController["getList"]["middlewares"],
    controller: cityController["getList"]["controller"],
  },
  {
    route: "/city/:id",
    type: "get",
    middlewares: cityController["getDetail"]["middlewares"],
    controller: cityController["getDetail"]["controller"],
  },
  {
    route: "/city/:id",
    type: "put",
    middlewares: cityController["put"]["middlewares"],
    controller: cityController["put"]["controller"],
  },
  {
    route: "/city/:id",
    type: "delete",
    middlewares: cityController["delete"]["middlewares"],
    controller: cityController["delete"]["controller"],
  },
  {
    route: "/staticAttribute",
    type: "post",
    middlewares: staticAttributeController["post"]["middlewares"],
    controller: staticAttributeController["post"]["controller"],
  },
  {
    route: "/staticAttribute",
    type: "get",
    middlewares: staticAttributeController["getList"]["middlewares"],
    controller: staticAttributeController["getList"]["controller"],
  },
  {
    route: "/staticAttribute/:id",
    type: "get",
    middlewares: staticAttributeController["getDetail"]["middlewares"],
    controller: staticAttributeController["getDetail"]["controller"],
  },
  {
    route: "/staticAttribute/:id",
    type: "put",
    middlewares: staticAttributeController["put"]["middlewares"],
    controller: staticAttributeController["put"]["controller"],
  },
  {
    route: "/staticAttribute/:id",
    type: "delete",
    middlewares: staticAttributeController["delete"]["middlewares"],
    controller: staticAttributeController["delete"]["controller"],
  },
  {
    route: "/product",
    type: "post",
    middlewares: productController["post"]["middlewares"],
    controller: productController["post"]["controller"],
  },
  {
    route: "/product",
    type: "get",
    middlewares: productController["getList"]["middlewares"],
    controller: productController["getList"]["controller"],
  },
  {
    route: "/product/:id",
    type: "get",
    middlewares: productController["getDetail"]["middlewares"],
    controller: productController["getDetail"]["controller"],
  },
  {
    route: "/product/:id",
    type: "put",
    middlewares: productController["put"]["middlewares"],
    controller: productController["put"]["controller"],
  },
  {
    route: "/product/:id",
    type: "delete",
    middlewares: productController["delete"]["middlewares"],
    controller: productController["delete"]["controller"],
  },
  {
    route: "/productAttribute",
    type: "post",
    middlewares: productAttributeController["post"]["middlewares"],
    controller: productAttributeController["post"]["controller"],
  },
  {
    route: "/productAttribute",
    type: "get",
    middlewares: productAttributeController["getList"]["middlewares"],
    controller: productAttributeController["getList"]["controller"],
  },
  {
    route: "/productAttribute/:id",
    type: "get",
    middlewares: productAttributeController["getDetail"]["middlewares"],
    controller: productAttributeController["getDetail"]["controller"],
  },
  {
    route: "/productAttribute/:id",
    type: "put",
    middlewares: productAttributeController["put"]["middlewares"],
    controller: productAttributeController["put"]["controller"],
  },
  {
    route: "/productAttribute/:id",
    type: "delete",
    middlewares: productAttributeController["delete"]["middlewares"],
    controller: productAttributeController["delete"]["controller"],
  },
  {
    route: "/productStaticAttributes",
    type: "post",
    middlewares: productStaticAttributesController["post"]["middlewares"],
    controller: productStaticAttributesController["post"]["controller"],
  },
  {
    route: "/productStaticAttributes",
    type: "get",
    middlewares: productStaticAttributesController["getList"]["middlewares"],
    controller: productStaticAttributesController["getList"]["controller"],
  },
  {
    route: "/productStaticAttributes/:id",
    type: "get",
    middlewares: productStaticAttributesController["getDetail"]["middlewares"],
    controller: productStaticAttributesController["getDetail"]["controller"],
  },
  {
    route: "/productStaticAttributes/:id",
    type: "put",
    middlewares: productStaticAttributesController["put"]["middlewares"],
    controller: productStaticAttributesController["put"]["controller"],
  },
  {
    route: "/productStaticAttributes/:id",
    type: "delete",
    middlewares: productStaticAttributesController["delete"]["middlewares"],
    controller: productStaticAttributesController["delete"]["controller"],
  },
  {
    route: "/productImage",
    type: "post",
    middlewares: productImageController["post"]["middlewares"],
    controller: productImageController["post"]["controller"],
  },
  {
    route: "/productImage",
    type: "get",
    middlewares: productImageController["getList"]["middlewares"],
    controller: productImageController["getList"]["controller"],
  },
  {
    route: "/productImage/:id",
    type: "get",
    middlewares: productImageController["getDetail"]["middlewares"],
    controller: productImageController["getDetail"]["controller"],
  },
  {
    route: "/productImage/:id",
    type: "put",
    middlewares: productImageController["put"]["middlewares"],
    controller: productImageController["put"]["controller"],
  },
  {
    route: "/productImage/:id",
    type: "delete",
    middlewares: productImageController["delete"]["middlewares"],
    controller: productImageController["delete"]["controller"],
  },
  {
    route: "/seller",
    type: "post",
    middlewares: sellerController["post"]["middlewares"],
    controller: sellerController["post"]["controller"],
  },
  {
    route: "/seller",
    type: "get",
    middlewares: sellerController["getList"]["middlewares"],
    controller: sellerController["getList"]["controller"],
  },
  {
    route: "/seller/:id",
    type: "get",
    middlewares: sellerController["getDetail"]["middlewares"],
    controller: sellerController["getDetail"]["controller"],
  },
  {
    route: "/seller/:id",
    type: "put",
    middlewares: sellerController["put"]["middlewares"],
    controller: sellerController["put"]["controller"],
  },
  {
    route: "/seller/:id",
    type: "delete",
    middlewares: sellerController["delete"]["middlewares"],
    controller: sellerController["delete"]["controller"],
  },
  {
    route: "/productSeller",
    type: "post",
    middlewares: productSellerController["post"]["middlewares"],
    controller: productSellerController["post"]["controller"],
  },
  {
    route: "/productSeller",
    type: "get",
    middlewares: productSellerController["getList"]["middlewares"],
    controller: productSellerController["getList"]["controller"],
  },
  {
    route: "/productSeller/:id",
    type: "get",
    middlewares: productSellerController["getDetail"]["middlewares"],
    controller: productSellerController["getDetail"]["controller"],
  },
  {
    route: "/productSeller/:id",
    type: "put",
    middlewares: productSellerController["put"]["middlewares"],
    controller: productSellerController["put"]["controller"],
  },
  {
    route: "/productSeller/:id",
    type: "delete",
    middlewares: productSellerController["delete"]["middlewares"],
    controller: productSellerController["delete"]["controller"],
  },
  {
    route: "/blogCategory",
    type: "post",
    middlewares: blogCategoryController["post"]["middlewares"],
    controller: blogCategoryController["post"]["controller"],
  },
  {
    route: "/blogCategory",
    type: "get",
    middlewares: blogCategoryController["getList"]["middlewares"],
    controller: blogCategoryController["getList"]["controller"],
  },
  {
    route: "/blogCategory/:id",
    type: "get",
    middlewares: blogCategoryController["getDetail"]["middlewares"],
    controller: blogCategoryController["getDetail"]["controller"],
  },
  {
    route: "/blogCategory/:id",
    type: "put",
    middlewares: blogCategoryController["put"]["middlewares"],
    controller: blogCategoryController["put"]["controller"],
  },
  {
    route: "/blogCategory/:id",
    type: "delete",
    middlewares: blogCategoryController["delete"]["middlewares"],
    controller: blogCategoryController["delete"]["controller"],
  },
  {
    route: "/blogPost",
    type: "post",
    middlewares: blogPostController["post"]["middlewares"],
    controller: blogPostController["post"]["controller"],
  },
  {
    route: "/blogPost",
    type: "get",
    middlewares: blogPostController["getList"]["middlewares"],
    controller: blogPostController["getList"]["controller"],
  },
  {
    route: "/blogPost/:id",
    type: "get",
    middlewares: blogPostController["getDetail"]["middlewares"],
    controller: blogPostController["getDetail"]["controller"],
  },
  {
    route: "/blogPost/:id",
    type: "put",
    middlewares: blogPostController["put"]["middlewares"],
    controller: blogPostController["put"]["controller"],
  },
  {
    route: "/blogPost/:id",
    type: "delete",
    middlewares: blogPostController["delete"]["middlewares"],
    controller: blogPostController["delete"]["controller"],
  },
  {
    route: "/generalSetting",
    type: "post",
    middlewares: generalSettingController["post"]["middlewares"],
    controller: generalSettingController["post"]["controller"],
  },
  {
    route: "/generalSetting",
    type: "get",
    middlewares: generalSettingController["getList"]["middlewares"],
    controller: generalSettingController["getList"]["controller"],
  },
  {
    route: "/generalSetting/:id",
    type: "get",
    middlewares: generalSettingController["getDetail"]["middlewares"],
    controller: generalSettingController["getDetail"]["controller"],
  },
  {
    route: "/generalSetting/:id",
    type: "put",
    middlewares: generalSettingController["put"]["middlewares"],
    controller: generalSettingController["put"]["controller"],
  },
  {
    route: "/generalSetting/:id",
    type: "delete",
    middlewares: generalSettingController["delete"]["middlewares"],
    controller: generalSettingController["delete"]["controller"],
  },
  {
    route: "/public/generalStats",
    type: "get",
    middlewares: publicController["generalStats"]["middlewares"],
    controller: publicController["generalStats"]["controller"],
  },

  {
    route: "/public/seenData",
    type: "get",
    middlewares: publicController["getSeenList"]["middlewares"],
    controller: publicController["getSeenList"]["controller"],
  },
  {
    route: "/public/seen",
    type: "post",
    middlewares: publicController["postSeen"]["middlewares"],
    controller: publicController["postSeen"]["controller"],
  },
];

module.exports = routes;
