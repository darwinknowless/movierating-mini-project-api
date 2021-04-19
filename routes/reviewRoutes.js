const express = require("express");
const router = express.Router();

// Import controller, validator & auth
const reviewValidator = require("../middlewares/validators/reviewValidator")
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

// TODO POST
router.get("/", reviewController.getAll);
router.post("/", 
//reviewValidator.create, 
reviewController.create); // ==> add auth soon
router.get("/:id", reviewValidator.getOne, reviewController.getOne);
router.put("/:id", reviewValidator.update, reviewController.update); // ==> add auth soon
router.delete("/:id", reviewValidator.delete, reviewController.delete); // ==> add auth soon

// Exports router
module.exports = router;
