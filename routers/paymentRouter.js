const router = require("express").Router();
const {
  initPayment,
  ipn,
  paymentSuccess,
  paymentFail,
  paymentCancel,
} = require("../controllers/paymentController");
const authorize = require("../middlewares/authorize");

router.route("/").post(authorize, initPayment);
router.route("/ipn").post(ipn);
router.route("/success").post(paymentSuccess);
router.route("/fail").post(paymentFail);
router.route("/cancel").post(paymentCancel);
module.exports = router;
