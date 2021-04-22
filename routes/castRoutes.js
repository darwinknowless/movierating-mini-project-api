const express = require("express");
const router = express.Router();

const castValidator = require("../middlewares/validators/castValidator");
const uploadCastPhoto = require("../middlewares/uploads/uploadFlow")
const castController = require("../controllers/castControllers");

// Get all transaksi data
router.get("/", castController.getAll);
router.get("/:id",  castController.getOne);
router.post("/", uploadCastPhoto.uploadCastPhoto, castController.create);
router.put("/:id", castController.update);
router.delete("/:id", castValidator.delete, castController.delete);

module.exports = router;
