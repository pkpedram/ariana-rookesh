const mongoose = require("mongoose");
          
const model = {
  relatedProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  relatedStaticAttribute: { type: mongoose.Schema.Types.ObjectId, ref: 'StaticAttribute'},
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const productstaticattributesSchema = new mongoose.Schema(model)
const ProductStaticAttributes = mongoose.model('ProductStaticAttributes', productstaticattributesSchema)
module.exports = ProductStaticAttributes
                      