const { review, movie, user, caster } = require("../models");
const { success, error } = require("../helpers/response");

class ReviewController {
  // Add Review
  async add(req, res) {
    try {
      let result = await review.register(
        req.user,
        req.query.movieId,
        req.body
      );
      success(res, result, 201);
    } catch (err) {
      console.log(err);
      error(res, err, 422);
    }
  }

  // Show User review only
  async mine(req, res) {
    try {
      let result = await review.myReview(
        req.user._id,
        req.query.pagination || true,
        req.query.page || 1
      );
      success(res, result, 200);
    } catch (err) {
      error(res, err, 422);
    }
  }

  // Show All
  async reviews(req, res) {
    try {
      let result = await review.movieReview(
        req.query.movieId,
        req.query.pagination || true,
        req.query.page || 1
      );
      success(res, result, 200);
    } catch (err) {
      error(res, err, 422);
    }
  }

  // Edit
  async edit(req, res) {
    try {
      let result = await review.editReview(
        req.user._id,
        req.query.reviewId,
        req.body
      );
      success(res, result, 201);
    } catch (err) {
      error(res, err, 422);
    }
  }

  // Delete
  async delete(req, res) {
    try {
      let result = await review.destroy(req.user._id, req.query.reviewId);
      success(res, result, 200);
    } catch (err) {
      error(res, err, 422);
    }
  }
}

module.exports = new ReviewController();
