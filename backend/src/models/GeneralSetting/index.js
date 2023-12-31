const mongoose = require("mongoose");
          
const model = {
  title: String,
  en_title: String,
  phoneNumber: String,
  logo: String,
  secondaryColor: String,
  catalog: String,
  aboutUs: String,
  en_aboutUs: String,
  contactUs: String,
  en_contactUs: String,
  email: String,
  address: String,
  en_address: String,
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const generalsettingSchema = new mongoose.Schema(model)
const GeneralSetting = mongoose.model('GeneralSetting', generalsettingSchema)
module.exports = GeneralSetting
                      