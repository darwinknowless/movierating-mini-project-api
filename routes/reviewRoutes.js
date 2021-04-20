const express = require("express");
const router = express.Router();

// Import controller, validator & auth
const reviewValidator = require("../middlewares/validators/reviewValidator")
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

// TODO POST
router.get("/", auth.user, reviewController.getAllreviewByUser);
router.post("/", auth.user,  reviewValidator.create, reviewController.create); // ==> add auth soon
//router.get("/:id", reviewValidator.getOne, reviewController.getOne);
router.put("/:id", auth.user, reviewValidator.update, reviewController.update); // ==> add auth soon
router.delete("/:id", auth.user, reviewValidator.delete, reviewController.delete); // ==> add auth soon

// Exports router
module.exports = router;
