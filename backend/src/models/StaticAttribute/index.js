const mongoose = require("mongoose");
          
const model = {
  title: String,
  en_title: String,
  icon: String,
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const staticattributeSchema = new mongoose.Schema(model)
const StaticAttribute = mongoose.model('StaticAttribute', staticattributeSchema)
module.exports = StaticAttribute
                      