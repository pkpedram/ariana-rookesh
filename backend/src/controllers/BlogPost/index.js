const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");
const BlogCategory = require("../../models/BlogCategory");

const BlogPost = require("../../models/BlogPost");
const BlogPostFaq = require("../../models/BlogPostFaq");
const BlogPostSection = require("../../models/BlogPostSection");

const blogPostController = {
  post: {
    middlewares: [
      authenticateJwtToken(["admin"]),
      upload("blogPost").fields([
        { name: "image", maxCount: 1 },
        { name: "authorPic", maxCount: 1 },
      ]),
    ],
    controller: async (req, res, next) => {
      try {
        let min = Math.trunc(req.body.content.length / 200);
        let second = Math.trunc(
          (req?.body?.content?.length / 200 -
            Math.trunc(req.body.content?.length / 200)) *
            0.6 *
            100
        );
        let blogPost = new BlogPost({
          title: req.body.title,
          en_title: req.body.en_title,
          content: req.body.content,
          en_content: req.body.en_content,
          description: req.body.description,
          isImportant: req.body.isImportant,
          en_description: req.body.en_description,
          authorName: req.body.authorName,
          authorDescription: req.body.authorDescription,
          authorPic: req?.files?.authorPic
            ? generateFileName(req.files.authorPic[0], "blogPost")
            : null,
          image: req?.files?.image
            ? generateFileName(req.files.image[0], "blogPost")
            : null,
          relatedBlogCategory: req.body.relatedBlogCategory,
          isActive: req.body.isActive,
          seenCount: 0,
          readingTime:
            min === 0
              ? second + " ثانیه "
              : min + " دقیقه و  " + second + " ثانیه ",
          created_date: new Date(),
        });
        console.log(
          req.body.content?.length / 200,
          req.body?.content?.length / 200 -
            Math.trunc(req.body.content?.length / 200)
        );
        await blogPost.save();
        if (process.env.NODE_ENV !== "production") {
          console.log(blogPost);
        }
        return res.send({ result: blogPost });
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  getList: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        res.send(await baseResults(BlogPost, "list", req.query, true, []));
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  postSection: {
    middlewares: [
      authenticateJwtToken(["admin"]),
      upload("blogPostSection").fields([{ name: "image", maxCount: 1 }]),
    ],
    controller: async (req, res, next) => {
      try {
        let blogPost = new BlogPostSection({
          title: req.body.title,
          en_title: req.body.en_title,
          content: req.body.content,
          en_content: req.body.en_content,
          image: req?.files?.image
            ? generateFileName(req.files.image[0], "blogPostSection")
            : null,
          relatedBlogPost: req.body.relatedBlogPost,
        });
        await blogPost.save();
        if (process.env.NODE_ENV !== "production") {
          console.log(blogPost);
        }
        return res.send({ result: blogPost });
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  postFaq: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let blogPost = new BlogPostFaq({
          title: req.body.title,
          en_title: req.body.en_title,
          content: req.body.content,
          en_content: req.body.en_content,
          relatedBlogPost: req.body.relatedBlogPost,
        });
        await blogPost.save();
        if (process.env.NODE_ENV !== "production") {
          console.log(blogPost);
        }
        return res.send({ result: blogPost });
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  getHome: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        let newest = await BlogPost.find({ isActive: true })
          .sort("-created_date")
          .limit(3);
        let mostSeen = await BlogPost.find({ isActive: true })
          .sort("-seenCount")
          .limit(3);
        let categories = await BlogCategory.find({ isActive: true });
        let output = [];
        for (let i = 0; i < categories.length; i++) {
          let newestInCat = await BlogPost.find({
            relatedBlogCategory: categories[i]?._id,
          })
            .sort("-created_date")
            .limit(3);
          let mostSeenInCat = await BlogPost.find({
            relatedBlogCategory: categories[i]?._id,
          })
            .sort("-seenCount")
            .limit(3);

          output.push({
            ...categories[i]?.toJSON(),
            newest: newestInCat,
            mostSeen: mostSeenInCat,
          });
        }

        return res.send({
          result: {
            newest: newest,
            mostSeen: mostSeen,
            categories: output,
          },
        });
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error ?? "مشکلی پیش آمده" });
        next();
      }
    },
  },
  getDetail: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let id = req.params.id;
        const blogPost = await BlogPost.findById(id).populate(
          "relatedBlogCategory"
        );
        const relatedPosts = await BlogPost.find({
          relatedBlogCategory: blogPost.relatedBlogCategory,
        })
          .sort("-created_date")
          .limit(3);
        const faq = await BlogPostFaq.find({ relatedBlogPost: id });
        const sections = await BlogPostSection.find({ relatedBlogPost: id });
        if (blogPost) {
          blogPost.seenCount += 1;
          await blogPost.save();
          return res.send({
            info: blogPost,
            relatedPosts: relatedPosts,
            faq,
            sections,
          });
        } else {
          res
            .status(404)
            .send({ message: "There is no BlogPost with this id" });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },

  put: {
    middlewares: [
      authenticateJwtToken(["admin"]),
      upload("blogPost").fields([
        { name: "image", maxCount: 1 },
        { name: "authorPic", maxCount: 1 },
      ]),
    ],
    controller: async (req, res, next) => {
      try {
        let id = req.params.id;
        const blogPost = await BlogPost.findById(id);
        if (blogPost) {
          let min = Math.trunc(req.body.content.length / 200);
          let second = Math.trunc(
            (req?.body?.content?.length / 200 -
              Math.trunc(req.body.content?.length / 200)) *
              0.6 *
              100
          );

          blogPost.image = req.files.image
            ? generateFileName(req.files.image[0], "blogPost")
            : blogPost.image;

          let keys = Object.keys(req.body);
          keys.map((item) => (blogPost[item] = req.body[item]));
          blogPost.readingTime =
            min === 0
              ? second + " ثانیه "
              : min + " دقیقه و  " + second + " ثانیه ";
          const updatedBlogPost = await blogPost.save();
          if (updatedBlogPost) {
            return res.send({ result: updatedBlogPost });
          } else {
            return res
              .status(500)
              .send({ message: "Error in updating BlogPost" });
          }
        } else {
          return res
            .status(404)
            .send({ message: "There is no BlogPost with this id" });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  putSection: {
    middlewares: [
      authenticateJwtToken(["admin"]),
      upload("blogPostSection").fields([{ name: "image", maxCount: 1 }]),
    ],
    controller: async (req, res, next) => {
      try {
        let id = req.params.id;
        const blogPost = await BlogPostSection.findById(id);
        if (blogPost) {
          blogPost.image = req.files.image
            ? generateFileName(req.files.image[0], "blogPostSection")
            : blogPost.image;

          let keys = Object.keys(req.body);
          keys.map((item) => (blogPost[item] = req.body[item]));
          const updatedBlogPost = await blogPost.save();
          if (updatedBlogPost) {
            return res.send({ result: updatedBlogPost });
          } else {
            return res
              .status(500)
              .send({ message: "Error in updating BlogPostSection" });
          }
        } else {
          return res
            .status(404)
            .send({ message: "There is no BlogPostSection with this id" });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  putFaq: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let id = req.params.id;
        const blogPost = await BlogPostFaq.findById(id);
        if (blogPost) {
          let keys = Object.keys(req.body);
          keys.map((item) => (blogPost[item] = req.body[item]));
          const updatedBlogPost = await blogPost.save();
          if (updatedBlogPost) {
            return res.send({ result: updatedBlogPost });
          } else {
            return res
              .status(500)
              .send({ message: "Error in updating BlogPostFaq" });
          }
        } else {
          return res
            .status(404)
            .send({ message: "There is no BlogPostFaq with this id" });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  delete: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (blogPost) {
          await blogPost.deleteOne({ _id: req.params.id });
          res.send({ message: "BlogPost Deleted" });
        } else {
          res.status(404).send({ message: "BlogPost Not Found" });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  deleteSection: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        const blogPost = await BlogPostSection.findById(req.params.id);
        if (blogPost) {
          await blogPost.deleteOne({ _id: req.params.id });
          res.send({ message: "BlogPostSection Deleted" });
        } else {
          res.status(404).send({ message: "BlogPostSection Not Found" });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
  deleteFaq: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        const blogPost = await BlogPostFaq.findById(req.params.id);
        if (blogPost) {
          await blogPost.deleteOne({ _id: req.params.id });
          res.send({ message: "BlogPostFaq Deleted" });
        } else {
          res.status(404).send({ message: "BlogPostFaq Not Found" });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        res.status(500).send({ message: error });
        next();
      }
    },
  },
};

module.exports = blogPostController;
