const mongoose = require("mongoose");
          
const model = {
  banner: String,
  icon: String,
  name: String,
  en_name: String,
  showOnHomePage: Boolean,
  slug: String,
  showProductPrices: Boolean,
  catalog: String,
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const categorySchema = new mongoose.Schema(model)
const Category = mongoose.model('Category', categorySchema)
module.exports = Category
                      