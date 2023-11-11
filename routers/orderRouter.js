const router = require("express").Router();
const { createOrderCOD, getOrders } = require("../controllers/orderController");
const authorize = require("../middlewares/authorize");

router.route("/").get(authorize, getOrders).post(authorize, createOrderCOD);

module.exports = router;
