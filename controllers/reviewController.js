const Review = require("../models/review");
const Movie = require("../models/movie");
const { Mongoose } = require("mongoose");

class ReviewController {
  //TODO Create Review (DONE)
  async create(req, res) {
    try {
      // create data
      const review = await Review.create(req.body);
      // if successful
      return res.status(201).json({
        message: "Success",
        data: review,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }
  //TODO Get User Review
  // async getUser(req, res) {
  //   try {
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  //TODO Get All Reviews
  async getAll(req, res) {
    try {
      req.body.movie = req.params.movieId;
      // Find all data
      const reviews = await Review.find({ movie: req.params.movieId });
      // If no data
      if (reviews.length === 0) {
        return res.status(404).json({
          message: "No reviews found",
        });
      }
      // If successful
      return res.status(200).json({
        message: "Success",
        count: reviews.length,
        data: reviews,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
  //TODO One Review
  async getOne(req, res) {
    try {
      const review = await Review.findById(req.params.id).populate({
        path: "Movie",
        select: "name title",
      });
      // If no review
      if (!review) {
        return res.status(404).json({
          message: `No review found with the id of ${req.params.id}`,
        });
      }
      // If successful
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
  //TODO Update Review
  async update(req, res) {
    try {
      let review = await Review.findById(req.params.id);
      // If no review
      if (!review) {
        return res.status(404).json({
          message: `No review with ${req.params.id}`,
        });
      }
      // Make sure belongs to user or user is admin
      if (review.user.toString() !== req.user.id && req.user.role !== "user") {
        return res.status(401).json({
          message: `Not authorized to update review`,
        });
      }
      review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      // If successful
      return res.status(201).json({
        message: "Success",
        data: review,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
  //TODO Delete Review
  async delete(req, res) {
    try {
      let review = await Review.findById(req.params.id);
      // If no review
      if (!review) {
        return res.status(404).json({
          message: `No review with ${req.params.id}`,
        });
      }
      // Make sure belongs to user or user is admin
      if (review.user.toString() !== req.user.id && req.user.role !== "user") {
        return res.status(401).json({
          message: `Not authorized to delete review`,
        });
      }

      await review.remove();

      // If successful
      return res.status(201).json({
        message: "Success",
        data: review,
      });
      // If Failed
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new ReviewController();
