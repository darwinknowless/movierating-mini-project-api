const express = require("express");

// Import validator
const categoryValidator = require("../middlewares/validators/categoryValidator");

// //import uploadflow
// const uploadCastPhoto = require("../middlewares/uploads/uploadFlow")

// Import controller
const categoryController = require("../controllers/categoryController");

const auth = require("../middlewares/auth")

// Make router
const router = express.Router();

// Get all transaksi data
router.get("/", categoryController.getAll);

// Get one transaksi
router.get("/:id",  categoryController.getOne);

// Create transaksi
router.post("/", auth.admin, categoryController.create);

// Update transaksi
router.put("/:id", categoryController.update);

// Delete transaksi
router.delete("/:id", categoryValidator.delete, categoryController.delete);

module.exports = router;
