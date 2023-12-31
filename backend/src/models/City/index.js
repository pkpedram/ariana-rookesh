const mongoose = require("mongoose");
          
const model = {
  name: String,
  en_name: String,
  ordering: Number,
  relatedProvince: { type: mongoose.Schema.Types.ObjectId, ref: 'Province'},
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const citySchema = new mongoose.Schema(model)
const City = mongoose.model('City', citySchema)
module.exports = City
                      