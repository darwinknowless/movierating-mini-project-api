const express = require("express");
const router = express.Router();
// const passport = require("passport");
const userController = require("../controllers/userController");
const userValidator = require("../middlewares/validators/userValidator");
const auth = require("../middlewares/auth");
<<<<<<< HEAD
const uploadUserPhoto = require("../middlewares/uploads/uploadFlow");
// User end point
=======

// Import validator

// Import controller
// const userController = require("../controllers/userController");

// Import auth (middleware)

// Make router
const router = express.Router();

>>>>>>> b5b38b5054c242be9848bc2bf7bc9ba327f7748a
router.post(
  "/signup",
  userValidator.signup,
  auth.signup,
  userController.getToken
);
router.post(
  "/signin",
  userValidator.signin,
  auth.signin,
  userController.getToken
);
router.put("/update/", auth.user, userValidator.update, userController.update);
router.get("/", auth.user, userController.getOne);
router.get("/adminpage/", auth.admin, userController.getOne);
router.get("/adminpage/users/", auth.admin, userController.getAll);
router.delete("/delete", auth.user, userController.delete);


router.post("/addwatchlist", auth.user, userController.addwatchlist);

module.exports = router;
