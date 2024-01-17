const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { encrypt } = require("../../core/utils/hasher");
const { generateJwtToken } = require("../../core/utils/jwt");
const { generateFileName } = require("../../core/utils/multer");
const User = require("../../models/User");

const usersController = {
  postBasic: {
    middlewares: [upload("user_avatar_").single("avatar")],
    controller: async (req, res, next) => {
      try {
        let user = new User({
          avatar: generateFileName(req.file, "user_avatar_"),
          password: encrypt(req.body.password),
          role: "basic",
          username: req.body.username,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        await user.save();
        console.log(user);

        return res.send(user);
      } catch (error) {
        console.error(error);
        res.send(error);
        next();
      }
    },
  },
  postAdmin: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let foundUser = await User.findOne({ username: req.body.username });
        if (foundUser?._id) {
          return res.status(400).send({
            message:
              "کاربر با این مشخصات قبلا ساخته شده است. لطفا نام کاربری دیگری انتخاب کنید",
          });
        }
        let user = new User({
          avatar: "",
          password: encrypt(req.body.password),
          role: "admin",
          username: req.body.username,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        await user.save();
        console.log(user);

        return res.send(user);
      } catch (error) {
        console.error(error);
        res.send(error);
        next();
      }
    },
  },

  login: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        let user = await User.findOne({
          username: req.body.username,
          password: encrypt(req.body.password),
        });
        console.log(user);
        if (user?._id) {
          let token = generateJwtToken({
            username: user.username,
            role: user.role,
            userId: user.id,
          });
          return res.send({ token: token });
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        console.error(error);
        next();
      }
    },
  },
  getUsers: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let users = await User.find(req.query);
        let newUsers = users.map((item) => ({
          _id: item._id,
          username: item.username,
          email: item.email,
          firstName: item.firstName,
          lastName: item.lastName,
        }));

        return res.send({
          result: newUsers,
          count: newUsers?.length,
        });
      } catch (error) {
        console.error(error);
        next();
      }
    },
  },
  loginAdmin: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        let user = await User.findOne({
          username: req.body.username,
          password: encrypt(req.body.password),
        });
        console.log(user);
        if (user?._id && user?.role == "admin") {
          let token = generateJwtToken({
            username: user.username,
            role: user.role,
            userId: user.id,
          });
          return res.send({ token: token, userData: user });
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        console.error(error);
        next();
      }
    },
  },
  put: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let id = req.params.id;
        const user = await User.findById(id);
        if (user) {
          user.password =
            req.body?.password?.length !== 0
              ? encrypt(req.body.password)
              : user.password;

          let keys = Object.keys(req.body).filter((itm) => itm !== "password");
          keys.map((item) => (user[item] = req.body[item]));
          const updatedUser = await user.save();
          if (updatedUser) {
            return res.send({ message: "با موفقیت تغییر یافت" });
          } else {
            return res
              .status(500)
              .send({ message: "مشکلی پیش آمده لطفا با تیم فنی تماس بگیرید" });
          }
        } else {
          return res
            .status(404)
            .send({ message: "کاربری با این مشخصات پیدا نشد" });
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
        const user = await User.findById(req.params.id);
        if (user) {
          await user.deleteOne({ _id: req.params.id });
          res.send({ message: "کاربر با موفقیت حذف شد" });
        } else {
          res.status(404).send({ message: "کاربری با این اطلاعات پیدا نشد" });
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

module.exports = usersController;
