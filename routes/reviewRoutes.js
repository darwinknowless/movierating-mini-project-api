const express = require("express");

// Import validator

// Import controller
const reviewController = require("../controllers/reviewController");

// Import auth (middleware)

// Make router
const router = express.Router();

router.post("/", reviewController.add);
router.get("/:id", reviewController.mine);
router.get("/", reviewController.reviews);
router.put("/:id", reviewController.edit);
router.delete("/:id", reviewController.delete);

// Exports router
module.exports = router;
