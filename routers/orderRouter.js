const router = require("express").Router();
const { getOrders } = require("../controllers/orderController");
const authorize = require("../middlewares/authorize");

router.route("/").get(authorize, getOrders);

module.exports = router;
