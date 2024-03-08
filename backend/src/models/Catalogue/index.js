const mongoose = require("mongoose");

const model = {
  title: String,
  en_title: String,
  file: String,
  isActive: { type: Boolean, default: true },
  created_date: { type: Date, default: new Date() },
};

const catalogueSchema = new mongoose.Schema(model);
const Catalogue = mongoose.model("Catalogue", catalogueSchema);
module.exports = Catalogue;
