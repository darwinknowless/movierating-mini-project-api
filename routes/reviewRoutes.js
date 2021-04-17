const express = require("express");

// Import validator

// Import controller
const reviewController = require("../controllers/reviewController");

// Import auth (middleware)

// Make router
const router = express.Router();

router.get("/", reviewController.allReviews);
router.get("/:id", reviewController.oneReviews);
router.post("/", reviewController.addReviews);
router.put("/:id", reviewController.editReviews);
router.delete("/:id", reviewController.deleteReviews);

// Exports router
module.exports = router;
