const { review, movie, user, caster } = require("../models");

class ReviewController {
  // Show All My Movie Reviews
  async allReviews(req, res) {
    try {
      const reviewers = await review.find({ movie: req.params.movieId });
      // If no data
      if (reviewers.length === 0) {
        return res.status(404).json({
          message: "My Reviews Not Found!",
        });
      }
      // If success
      return res.status(200).json({
        success: true,
        message: "Success Show All My Reviews",
        reviewers,
      });
    } catch (e) {
      console.log(e);
      // If failed
      return res.status(500).json({
        message: "Internal Server Error!",
        error: e,
      });
    }
  }

  // Show Review
  async oneReviews(req, res) {
    try {
      const reviewer = await review.findById(req.params.id).populate({
        path: "movie",
        select: "name description",
      });
      // If review not found
      if (!reviewer) {
        return res.status(404).json({
          message: `No review found with the id of ${req.params.id}`,
        });
      }
      // If success
      return res.status(200).json({
        message: "Success, show my review",
        reviewer,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  // Add Review
  async addReviews(req, res) {
    try {
      req.body.movie = req.params.movieId;
      req.body.user = req.user.id;
      // Func Find movie by ID
      const film = await movie.findById(req.params.movieId);
      // If movie not found
      if (!film) {
        return res.status(404).json({
          message: `No Movie with ${req.params.movieId}`,
        });
      }
      // Func Add
      const reviewer = await review.create(req.body);
      // If success
      return res.status(201).json({
        message: "Review added",
        success: true,
        data: reviewer,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  // Edit/Update Review
  async editReviews(req, res) {
    try {
      let reviewer = await review.findById(req.params.id);

      // If review not found
      if (!reviewer) {
        return res.status(404).json({
          message: `No review with ${req.params.id}`,
        });
      }
      // Make sure belongs to user or user is admin
      if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(401).json({
          message: "Not authorized to edit/update review",
        });
      }
      reviewer = await review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      // If success
      return res.status(200).json({
        message: "Success, review updated",
        success: true,
        data: reviewer,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  // Delete Review
  async deleteReviews(req, res) {
    try {
      const reviewer = await review.findById(req.params.id);
      // If review not found
      if (!reviewer) {
        return res.status(404).json({
          message: `No review with ${req.params.id}`,
        });
      }
      // Make sure belongs to user or user is admin
      if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(401).json({
          message: "Not authorized to edit/update review",
        });
      }
      // Function delete
      await review.remove();
      // If success
      return res.status(200).json({
        message: "Success, review deleted",
        success: true,
        data: {},
      });
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
