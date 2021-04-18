const express = require("express");

// Import validator
const reviewValidator = require("../middlewares/validators/reviewValidator")

// Import controller
const reviewController = require("../controllers/reviewController");

// Import auth (middleware)

// Make router
const router = express.Router();

// TODO POST
router.post("/", reviewValidator.addReview, reviewController.addReview); // ==> add auth soon
router.get("/:userId", reviewValidator.userReviews, reviewController.userReviews);
router.get("/:reviewId", reviewValidator.singleReview, reviewController.singleReview);
router.get("/", reviewValidator.allReviews, reviewController.allReviews);
router.put("/reviewId", reviewValidator.editReview, reviewController.editReview); // ==> add auth soon
router.delete("/reviewId", reviewValidator.deleteReview, reviewController.deleteReview); // ==> add auth soon

// Exports router
module.exports = router;
