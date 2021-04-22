const express = require("express");
const router = express.Router();

const castValidator = require("../middlewares/validators/castValidator");
const uploadCastPhoto = require("../middlewares/uploads/uploadFlow")
const castController = require("../controllers/castControllers");

<<<<<<< HEAD
=======
const auth = require("../middlewares/auth")

// Make router
const router = express.Router();

>>>>>>> b5b38b5054c242be9848bc2bf7bc9ba327f7748a
// Get all transaksi data
router.get("/", castController.getAll);
router.get("/:id",  castController.getOne);
<<<<<<< HEAD
router.post("/", uploadCastPhoto.uploadCastPhoto, castController.create);
=======

// Create transaksi
router.post("/", auth.admin, uploadCastPhoto.uploadCastPhoto, castController.create);

// Update transaksi
>>>>>>> b5b38b5054c242be9848bc2bf7bc9ba327f7748a
router.put("/:id", castController.update);
router.delete("/:id", castValidator.delete, castController.delete);

module.exports = router;
