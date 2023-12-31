const mongoose = require("mongoose");
          
const model = {
  relatedProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  image: String,
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const productimageSchema = new mongoose.Schema(model)
const ProductImage = mongoose.model('ProductImage', productimageSchema)
module.exports = ProductImage
                      