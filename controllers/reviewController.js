const { user, movie, review, cast } = require("../models");

class ReviewController {
  //TODO Create Review
  async create(req, res) {
    try {
      req.body.userId = req.user.id;

      const datamovie = await movie.findOne({_id : req.body.movieId});
      console.log(datamovie)
      if (!datamovie) {
        return res.status(404).json({
          message: `No movie with ${req.body.movieId}`,
        });
      }
      // create data
      const datareview = await review.create(req.body);
      let newreview = await movie.updateOne(
        { _id: req.body.movieId },
        { $push: { reviews: datareview._id } },
        { new: true }
      );
      // if successful
      return res.status(201).json({
        message: "Success",
        data: datareview,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: e.message,
      });
    }
  }
  //TODO Get User Review
  // async getUser(req, res) {
  //   try {
  //   } catch (e) {
  //     console.log(e);
  //   }
  //}
  //TODO Get All Reviews
  async getAllreviewByUser(req, res) {
    try {

      req.body.userId = req.user.id;
      // Find all data
      const datareviews = await review
        .find({ movie: req.body.movieId })
        .populate("movie");
      // If no data
      if (datareviews.length === 0) {
        return res.status(404).json({
          message: "No reviews found",
        });
      }
      // If successful
      return res.status(200).json({
        message: "Success",
        count: datareviews.length,
        data: datareviews,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }
  //TODO One Review
  // async getOne(req, res) {
  //   try {
  //     const review = await Review.findById(req.params.id).populate({
  //       path: "Movie",
  //       select: "name title",
  //     });
  //     // If no review
  //     if (!review) {
  //       return res.status(404).json({
  //         message: `No review found with the id of ${req.params.id}`,
  //       });
  //     }
  //     // If successful
  //     return res.status(200).json({
  //       message: "Success",
  //       data,
  //     });
  //   } catch (e) {
  //     return res.status(500).json({
  //       message: "Internal Server Error",
  //       error: err.message,
  //     });
  //   }
  // } // end of Get One

  //TODO Update Review
  async update(req, res) {
    try {
      req.body.userId = req.user.id;
      datareview = await review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      // If successful
      return res.status(201).json({
        message: "Success",
        data: datareview,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }
  //TODO Delete Review
  async delete(req, res) {
    try {
      req.body.userId = req.user.id;
      let datareview = await review.findById(req.params.id);
      // If no review
      if (!datareview) {
        return res.status(404).json({
          message: `No review with ${req.params.id}`,
        });
      }
      // Make sure belongs to user or user is admin
      // if (datareview.user.toString() !== req.user.id && req.user.role !== "user") {
      //   return res.status(401).json({
      //     message: `Not authorized to delete review`,
      //   });
      // }

      await datareview.remove();

      // If successful
      return res.status(201).json({
        message: "Success",
        data: datareview,
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
