const mongoose = require("mongoose");
          
const model = {
  title: String,
  en_title: String,
  image: String,
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const blogcategorySchema = new mongoose.Schema(model)
const BlogCategory = mongoose.model('BlogCategory', blogcategorySchema)
module.exports = BlogCategory
                      