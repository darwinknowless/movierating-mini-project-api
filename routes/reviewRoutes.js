const express = require("express");
const router = express.Router();

// Import controller, validator & auth
const reviewValidator = require("../middlewares/validators/reviewValidator")
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

// TODO POST
router.post("/create", auth.user, reviewValidator.create, reviewController.create);
router.get("/", auth.user, reviewController.getAllreviewByUser)
router.put("/update/:id", auth.user, reviewValidator.update, reviewController.update);
router.delete("/delete/:id", auth.user, reviewValidator.delete, reviewController.delete);
// Exports router
module.exports = router;
