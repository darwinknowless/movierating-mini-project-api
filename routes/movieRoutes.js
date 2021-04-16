const express = require("express");

// Import validator

// Import controller
const movieController = require("../controllers/movieController");

// Import auth (middleware)

// Make router
const router = express.Router();

router.post("/", movieController.create);
router.get("/", movieController.getAll);


// Exports router
module.exports = router;