const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const validator = require("validator");

exports.delete = async (req, res, next) => {
  
    // Check params is valid or not
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "id_movie is not valid and must be 24 character & hexadecimal",
      });
    }
      // Go to next
    next();
  };
  
