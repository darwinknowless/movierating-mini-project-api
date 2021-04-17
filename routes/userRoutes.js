const express = require("express");
// const passport = require("passport");
const userController = require("../controllers/userController");
const userValidator = require("../middlewares/validators/userValidator");
const auth =  require("../middlewares/auth");

// Import validator

// Import controller
// const userController = require("../controllers/userController");

// Import auth (middleware)

// Make router
const router = express.Router();

// router.post("/signup", userValidator.signup, auth.signup, userController.getToken);
// router.post("/signin",userValidator.signin, auth.signin, userController.getToken);
// router.put("/update/", auth.user,userValidator.update, userController.update);

// router.get("/", auth.user, userController.getOne);

module.exports = router;
