const userRouter = require("../routers/userRouter");
const orderRouter = require("../routers/orderRouter");
const profileRouter = require("../routers/profileRouter");

module.exports = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/profile", profileRouter);
};
