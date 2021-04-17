const express = require("express");

// Import validator
const movieValidator = require("../middlewares/validators/movieValidator");

// Import controller
const movieController = require("../controllers/movieController");

// Import upload
const movieUpload = require("../middlewares/upload/moviePosterUpload");

//Import auth
const auth = require("../middlewares/auth");

// Make router
const router = express.Router();

router.post("/", auth.admin, movieUpload.uploadPoster, movieController.create);
router.delete(
  "/:id",
  auth.admin,
  movieValidator.delete,
  movieController.deleteMovie
);
router.get("/", movieController.getAll);
router.get("/:page", movieController.getAll);
router.get("/:title", movieController.getAll);
router.get("/:genre", movieController.getAll);

// Exports router
module.exports = router;
