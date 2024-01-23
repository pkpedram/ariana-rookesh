const mongoose = require("mongoose");

const model = {
  relatedProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  relatedSeller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  isActive: { type: Boolean, default: true },
  created_date: { type: Date, default: new Date() },
};

const productsellerSchema = new mongoose.Schema(model);
const ProductSeller = mongoose.model("ProductSeller", productsellerSchema);
module.exports = ProductSeller;
