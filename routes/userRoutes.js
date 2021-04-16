const express = require("express");
// const passport = require("passport");
const userController = require("../controllers/userController");
const userValidator = require("../middlewares/validators/userValidator");
const auth = require("../middlewares/auth");
const uploadUserPhoto = require("../middlewares/upload/userPhotoUpload");

// Make router
const router = express.Router();

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
// Exports router
module.exports = router;
