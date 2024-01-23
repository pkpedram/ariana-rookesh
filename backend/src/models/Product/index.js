const mongoose = require("mongoose");

const model = {
  name: String,
  en_name: String,
  description: String,
  en_description: String,
  price: String,
  showPrice: Boolean,
  relatedCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  isActive: { type: Boolean, default: true },
  created_date: { type: Date, default: new Date() },
};

const productSchema = new mongoose.Schema(model);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
