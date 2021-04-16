const express = require("express");

// Import validator

// Import controller
const movieController = require("../controllers/movieController");

// Import upload
const movieUpload = require("../middlewares/upload/moviePosterUpload");

//Import auth

// Make router
const router = express.Router();

router.post("/", movieUpload.uploadPoster, movieController.create);
router.get("/",  movieController.getAll);

// Exports router
module.exports = router;
