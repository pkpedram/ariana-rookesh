const mongoose = require("mongoose");

const model = {
  title: String,
  en_title: String,
  content: String,
  en_content: String,
  image: String,
  relatedBlogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogPost",
  },
};

const blogpostSchema = new mongoose.Schema(model);
const BlogPostSection = mongoose.model("BlogPostSection", blogpostSchema);
module.exports = BlogPostSection;
