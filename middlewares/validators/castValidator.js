const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const validator = require("validator");
const { cast, movie } = require("../../models");

exports.getOne = (req, res, next) => {
  // Check parameter is valid or not
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      message: "Data Not Found",
    });
  }

  next();
};

exports.update = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      message: "Data Not Found",
    });
  }

  next();
};

exports.delete = async (req, res, next) => {
  let errors = [];

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      message: "Data Not Found",
    });
  }

  next();
};