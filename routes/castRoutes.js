const express = require("express");

// Import validator
const castValidator = require("../middlewares/validators/castValidator");

// Import controller
const castController = require("../controllers/castControllers");

// Make router
const router = express.Router();

// Get all transaksi data
router.get("/", castController.getAll);

// Get one transaksi
router.get("/:id", castValidator.getOne, castController.getOne);

// Create transaksi
router.post("/", castController.create);

// Update transaksi
router.put("/:id", castController.update);

// Delete transaksi
router.delete("/:id", castValidator.delete, castController.delete);

module.exports = router;
