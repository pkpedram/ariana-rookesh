const mongoose = require("mongoose");

const model = {
  title: String,
  en_title: String,
  content: String,
  en_content: String,
  relatedBlogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogPost",
  },
};

const blogpostSchema = new mongoose.Schema(model);
const BlogPostFaq = mongoose.model("BlogPostFaq", blogpostSchema);
module.exports = BlogPostFaq;
