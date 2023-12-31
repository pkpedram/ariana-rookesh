const mongoose = require("mongoose");
          
const model = {
  relatedContactUsFormCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactUsFormCategory'},
  fullName: String,
  phoneNumber: String,
  companyName: String,
  relatedProductCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  message: String,
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const contactusformSchema = new mongoose.Schema(model)
const ContactUsForm = mongoose.model('ContactUsForm', contactusformSchema)
module.exports = ContactUsForm
                      