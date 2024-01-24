const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");
const BlogCategory = require("../../models/BlogCategory");

const BlogPost = require("../../models/BlogPost");

const blogPostController = {
  post: {
    middlewares: [
      authenticateJwtToken(["admin"]),
      upload("blogPost").fields([{ name: "image", maxCount: 1 }]),
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
  getHome: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        let newest = await BlogPost.find().sort("-created_date").limit(3);
        let mostSeen = await BlogPost.find().sort("-seenCount").limit(3);
        let categories = await BlogCategory.find();
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
        const blogPost = await BlogPost.findById(id);

        if (blogPost) {
          blogPost.seenCount += 1;
          await blogPost.save();
          return res.send(
            await baseResults(BlogPost, "id", req.params, false, [])
          );
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
      upload("blogPost").fields([{ name: "image", maxCount: 1 }]),
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
};

module.exports = blogPostController;
