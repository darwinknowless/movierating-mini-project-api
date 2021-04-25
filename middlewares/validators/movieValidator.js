const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const validator = require("validator");
const { movie } = require("../../models");

exports.cekParamsId = async (req, res, next) => {
  // Check params is valid or not
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "id is not valid and must be 24 character & hexadecimal",
    });
  }
  // Go to next
  next();
};

// exports.cekParamsCategory = async (req, res, next) => {
//   // Check params is valid or not
//   if (!mongoose.Types.ObjectId.isValid(req.params.category)) {
//     return res.status(400).json({
//       message: "Id request is not valid",
//     });
//   }
//   // Go to next
//   next();
// };

exports.getAllValidator = async (req, res, next) => {
  try {
    if (req.params.page) {
      let total = await movie.find();
      total = Math.ceil(total.length / 10);
      if (req.params.page > total) {
        return res.status(400).json({
          message: "Page request out of index",
        });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.categoryValidator = async (req, res, next) => {
  try {
    if (req.params.page) {
      let total = await movie.find({ genre: req.body.genre });
      total = Math.ceil(total.length / 10);
      if (req.params.page > total) {
        return res.status(400).json({
          message: "Page request out of index",
        });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

  exports.updateValidator = async (req, res, next)=> {
    try {
      // Find one data
      let data = await movie.findOne({ _id: req.params.id });

      // If data not found
      if (!data) {
        return res.status(404).json({
          message: "movie Not Found",
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
};
