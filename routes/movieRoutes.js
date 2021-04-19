const express = require("express");

// Import validator
const movieValidator = require("../middlewares/validators/movieValidator");

// Import controller
const movieController = require("../controllers/movieController");

// Import upload
const movieUpload = require("../middlewares/uploads/uploadFlow");

//Import auth
const auth = require("../middlewares/auth");

// Make router
const router = express.Router();

router.post("/", auth.user, movieUpload.uploadPoster, movieController.create);

router.delete(
  "/:id",
  auth.admin,
  movieValidator.cekParamsId,
  movieController.deleteMovie
);
router.get("/detail/:id", movieValidator.cekParamsId, movieController.getOne);

router.get("/search/:title", movieController.getMoviebyTitle);

router.get("/category/:category", movieValidator.cekParamsCategory, movieController.getMoviebyCategory);
router.get("/category/:category/:page",movieValidator.cekParamsCategory, movieController.getMoviebyCategory );

router.get("/", movieController.getAll);
router.get("/:page", movieController.getAll);

router.put("/update/:id", auth.admin, movieUpload.uploadPoster, movieController.updateMovie);



// Exports router
module.exports = router;
