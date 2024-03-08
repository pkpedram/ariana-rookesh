const mongoose = require("mongoose");

const model = {
  relatedProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  offerPrice: String,
  from_date: { type: Date, default: new Date() },
  to_date: { type: Date, default: new Date() },
  isActive: { type: Boolean, default: true },
  created_date: { type: Date, default: new Date() },
};

const hotOfferSchema = new mongoose.Schema(model);
const HotOffer = mongoose.model("HotOffer", hotOfferSchema);
module.exports = HotOffer;
