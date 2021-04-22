const express = require("express");
const router = express.Router();
// Import validator, auth, controller
const movieValidator = require("../middlewares/validators/movieValidator");
const movieController = require("../controllers/movieController");
const movieUpload = require("../middlewares/uploads/uploadFlow");
const auth = require("../middlewares/auth");

// Movie End Point
router.post("/", auth.admin, movieUpload.uploadPoster, movieController.create);

router.delete(
  "/:id",
  auth.admin,
  movieValidator.cekParamsId,
  movieController.deleteMovie
);
router.get("/movieOne/:id", movieValidator.cekParamsId, movieController.getOne);

router.get("/search/", movieController.getMoviebyTitle);

router.get(
  "/category/:category",
  //movieValidator.categoryValidator,
  movieController.getMoviebyCategory
);
router.get(
  "/category/:category/:page",
  //movieValidator.categoryValidator,
  movieController.getMoviebyCategory
);

router.get("/", movieValidator.getAllValidator, movieController.getAll);
router.get("/:page", movieValidator.getAllValidator, movieController.getAll);

router.put(
  "/update/:id",
  auth.admin,
  movieValidator.cekParamsId,
  movieValidator.updateValidator,
  movieUpload.uploadPoster,
  movieController.updateMovie
);
router.put(
  "/updatecast/:id",
  auth.admin,
  movieValidator.cekParamsId,
  movieValidator.updateValidator,
  movieUpload.uploadPoster,
  movieController.updateMovieCast
);

// Exports router
module.exports = router;
