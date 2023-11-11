const _ = require("lodash");
const { Order } = require("../models/order");
const { Profile } = require("../models/profile");

module.exports.createOrderCOD = async (req, res) => {
  const userId = req.user._id;
  const ingredients = req.body.ingredients;
  const profile = await Profile.findOne({ user: userId });
  const tran_id =
    "_" + Math.random().toString(36).substring(2, 9) + new Date().getTime();
  const order = new Order({
    ingredients: ingredients,
    transaction_id: tran_id,
    address: profile,
    status: "Complete",
    user: userId,
    sessionKey: "NA",
    paymentStatus: "Cash on Delivery",
    sslStatus: "NA",
  });
  await order.save();
  return res.status(200).send({
    message: "Ordered successfully!",
    data: {
      order: order,
    },
  });
};

module.exports.getOrders = async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
    status: "Complete",
  })
    .populate("user", "name")
    .sort({
      createdAt: -1,
    });
  return res.status(200).send(orders);
};
