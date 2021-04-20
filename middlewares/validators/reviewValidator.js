const mongoose = require("mongoose");
const validator = require("validator");
const { review, movie, user } = require("../../models");

exports.getOneReview = (req, res, next) => {
  // Check parameter is valid or not
  if (!mongoose.Types.ObjectId.isValid(req.params.review_id)) {
    return res.status(400).json({
      message: "Review ID is not valid",
    });
  }
  next();
};

exports.createReview = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.movie_id)) {
    return res.status(400).json({
      message: "Movie ID is not valid",
    });
  }

  let errors = [];

  let findData = await Promise.all([
    movie.findOne({ _id: req.body.movie_id }),
    review.findOne({
      movie: req.body.movie_id,
      user: req.user.id,
    }),
  ]);

  if (!findData[0]) {
    errors.push("Movie not found");
  }

  if (findData[1]) {
    errors.push("You already reviewed this movie");
  }

  if (req.body.rating < 1 || req.body.rating > 5) {
    errors.push("Rating is not valid");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }
  // Go to next
  next();
};

exports.updateReview = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.review_id)) {
    return res.status(400).json({
      message: "Review ID is not valid",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.movie_id)) {
    return res.status(400).json({
      message: "Movie ID is not valid",
    });
  }

  let errors = [];

  let findData = await Promise.all([
    movie.findOne({ _id: req.body.movie_id }),
    review.findOne({ _id: req.params.review_id, deleted: false }),
  ]);

  if (!findData[0]) {
    errors.push("Movie not found");
  }

  if (!findData[1]) {
    errors.push("Review not found");
  }

  if (req.body.rating < 1 || req.body.rating > 5) {
    errors.push("Rating is not valid");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }

  next();
};

exports.deleteReview = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.review_id)) {
    return res.status(400).json({
      message: "Review ID is not valid",
    });
  }

  let findReview = await review.findOne({
    _id: req.params.review_id,
    deleted: false,
  });

  if (!findReview) {
    return res.status(400).json({
      message: "Review not found",
    });
  }

  // Go to next
  next();
};
