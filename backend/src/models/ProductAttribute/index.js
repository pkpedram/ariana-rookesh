const mongoose = require("mongoose");
          
const model = {
  relatedProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  title: String,
  value: String,
  en_title: String,
  en_value: String,
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const productattributeSchema = new mongoose.Schema(model)
const ProductAttribute = mongoose.model('ProductAttribute', productattributeSchema)
module.exports = ProductAttribute
                      