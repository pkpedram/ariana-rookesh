const mongoose = require("mongoose");
          
const model = {
  name: String,
  en_name: String,
  ordering: Number,
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const provinceSchema = new mongoose.Schema(model)
const Province = mongoose.model('Province', provinceSchema)
module.exports = Province
                      