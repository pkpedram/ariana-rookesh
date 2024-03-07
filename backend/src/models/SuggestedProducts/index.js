const mongoose = require("mongoose");

const model = {
    relatedProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    suggestedProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    isActive: { type: Boolean, default: true },
    created_date: { type: Date, default: new Date() }
};

const suggestedProductSchema = new mongoose.Schema(model)
const SuggestedProduct = mongoose.model('SuggestedProduct', suggestedProductSchema)
module.exports = SuggestedProduct