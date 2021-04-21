const express = require("express");
const router = express.Router();

// Import controller, validator & auth
const reviewValidator = require("../middlewares/validators/reviewValidator");
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

// TODO POST
// router.get("/movie/:movie_id", reviewController.getAll);
// router.get("/movie/:user_id", reviewController.getUser);
// router.get("/:review_id", reviewController.getOne);
router.post("/create", reviewController.create);
// router.put("/:review_id", reviewController.update);
// router.delete("/:review_id", reviewController.delete);

// Exports router
module.exports = router;
