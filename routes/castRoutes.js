const express = require("express");

// Import validator
const castValidator = require("../middlewares/validators/castValidator");

//import uploadflow
const uploadCastPhoto = require("../middlewares/uploads/uploadFlow")

// Import controller
const castController = require("../controllers/castControllers");

// Make router
const router = express.Router();

// Get all transaksi data
router.get("/", castController.getAll);

// Get one transaksi
router.get("/:id",  castController.getOne);

// Create transaksi
router.post("/", uploadCastPhoto.uploadCastPhoto, castController.create);

// Update transaksi
router.put("/:id", castController.update);

// Delete transaksi
router.delete("/:id", castValidator.delete, castController.delete);

module.exports = router;
