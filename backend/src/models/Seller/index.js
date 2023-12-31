const mongoose = require("mongoose");
          
const model = {
  name: String,
  relatedCity: { type: mongoose.Schema.Types.ObjectId, ref: 'City'},
  description: String,
  en_name: String,
  en_description: String,
  phoneNumber: String,
  code: String,
  address: String,
  agentName: String,
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const sellerSchema = new mongoose.Schema(model)
const Seller = mongoose.model('Seller', sellerSchema)
module.exports = Seller
                      