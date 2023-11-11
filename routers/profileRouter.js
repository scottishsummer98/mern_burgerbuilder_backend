const router = require("express").Router();
const {
  getUserDetails,
  addUserDetails,
  updateUserDetailsById,
} = require("../controllers/profileController");
const authorize = require("../middlewares/authorize");

router
  .route("/")
  .get(authorize, getUserDetails)
  .post(authorize, addUserDetails);

router.route("/:id").put(authorize, updateUserDetailsById);

module.exports = router;
