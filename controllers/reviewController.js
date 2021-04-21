const { review, movie } = require("../models");

class ReviewController {
  async create(req, res) {
    try {
      req.body.user = req.user.id;
      console.log(req.body)
      // Create data
      let data = await review.create(req.body);
      console.log(req.body)

      // let newreview = await movie.updateOne(
      //   { _id: req.body.movieId },
      //   { $push: { reviews: data._id } },
      //   { new: true }
      // );

      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }

  async getAllreviewByUser(req, res) {
    try {
      req.body.user = req.user.id;
      // Find all data
      const datareviews = await review
        .find({ user: req.body.user })
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

  async update(req, res) {
    try {
      req.body.userId = req.user.id;
      const singleReview = await review.findById(req.params.id);

      if (singleReview.userId.toString() !== req.user.id && req.user.id) {
        return res.status(404).json({
          message: `you are not the owner of this review`,
        });
      }
      // Update data
      let data = await review.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body, // This is all of req.body
        {
          new: true,
        }
      );

      // If success
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }

  async delete(req, res) {
    try {
      req.body.userId = req.user.id;
      const singleReview = await review.findById(req.params.id);

      if (singleReview.userId.toString() !== req.user.id && req.user.id) {
        return res.status(404).json({
          message: `you are not the owner of this review`,
        });
      }
      // delete data depends on req.params.id
      let data = await review.remove();

      // If success
      return res.status(200).json({
        message: "Success to delete transaksi",
      });
    } catch (e) {
      // If failed
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }
}

module.exports = new ReviewController();
