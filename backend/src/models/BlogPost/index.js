const mongoose = require("mongoose");

const model = {
  title: String,
  en_title: String,
  content: String,
  en_content: String,
  image: String,
  isActive: { type: Boolean, default: true },
  relatedBlogCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogCategory",
  },
  seenCount: Number,
  readingTime: String,
  created_date: { type: Date, default: new Date() },
};

const blogpostSchema = new mongoose.Schema(model);
const BlogPost = mongoose.model("BlogPost", blogpostSchema);
module.exports = BlogPost;
