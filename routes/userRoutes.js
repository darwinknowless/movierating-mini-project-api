const express = require("express");
const router = express.Router();
// const passport = require("passport");
const userController = require("../controllers/userController");
const userValidator = require("../middlewares/validators/userValidator");
const auth = require("../middlewares/auth");
const uploadUserPhoto = require("../middlewares/uploads/uploadFlow");
// User end point
router.post(
  "/signup",
  userValidator.signup,
  uploadUserPhoto.uploadPhoto,
  auth.signup,
  userController.getToken
);
router.post(
  "/signin",
  userValidator.signin,
  auth.signin,
  userController.getToken
);
router.put(
  "/update/",
  auth.user,
  userValidator.update,
  uploadUserPhoto.uploadPhoto,
  userController.update
);

router.get("/", auth.user, userController.getOne);

module.exports = router;
