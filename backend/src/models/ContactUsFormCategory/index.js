const mongoose = require("mongoose");
          
const model = {
  title: String,
  ordering: Number,
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const contactusformcategorySchema = new mongoose.Schema(model)
const ContactUsFormCategory = mongoose.model('ContactUsFormCategory', contactusformcategorySchema)
module.exports = ContactUsFormCategory
                      