const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");
const User = require("../../models/User");
const Seen = require("../../models/Seen");

const publicController = {
  generalStats: {
    middlewares: [authenticateJwtToken(["admin"])],
    controller: async (req, res, next) => {
      try {
        let userCount = await User.count();
        let seenCount = await Seen.count();
        res.send({
          userCount: userCount,
          seenCount: seenCount,
        });
      } catch (error) {
        res
          .status(500)
          .send({
            message:
              "خطایی هست که نمیدونیم چیه لطفا تا آپدیت بعدی شکیبا باشید.",
          });
      }
    },
  },
  getSeenList: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        // res.send(await baseResults(Seen, 'list', req.query, false, []))
        let seen = await Seen.find(req.query);
        let list = [];

        await seen.map((item) => {
          if (
            !list.includes(new Date(item.created_date).toJSON().split("T")[0])
          ) {
            list.push(new Date(item.created_date).toJSON().split("T")[0]);
          }
        });

        let result = [];
        await list.map((item) => {
          result.push([
            item,
            seen.filter(
              (itm) => new Date(itm.created_date).toJSON().split("T")[0] == item
            ).length,
          ]);
        });

        return await res.send({
          result: result,
        });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({
            message:
              "خطایی هست که نمیدونیم چیه لطفا تا آپدیت بعدی شکیبا باشید.",
          });
      }
    },
  },
};

module.exports = publicController;
