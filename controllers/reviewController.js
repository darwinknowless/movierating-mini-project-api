const Review = require("../models/review");
const Movie = require("../models/movie");

const ratingCalculation = async (movieId) => {
  const reviews = await Review.find({ movie: movieId }, "rating");
  const totalReview = await Review.countDocuments({ movie: movieId });
  let totalRating = 0;
  reviews.forEach((el) => (totalRating += el.rating));
  // console.log(totalRating);
  // console.log(totalReview);
  let avgRating = parseFloat((totalRating / totalReview).toFixed(2));
  // console.log(avgRating);
  const movie = await Movie.findOne({ _id: movieId });
  // validator
  movie.averageRating = avgRating;
  movie.nRating = totalReview;
  await movie.save();
};

class ReviewController {
  //TODO Get All USer Review
  async getUser(req, res) {
    try {
      let Errors = [];
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        // page: 1,
        // limit: 10,
      };
      let dataReview = await review.paginate(
        { user: req.params.user_id, deleted: false },
        options
      );

      if (!dataReview.totalDocs.length) {
        Errors.push("You're not reviewing anything yet!");
      }

      if (dataReview.page > dataReview.totalPages) {
        Errors.push("page not found");
      }

      if (Errors.length > 0) {
        return res.status(404).json({
          message: Errors.join(", "),
        });
      }

      return res.status(200).json({
        message: "Success",
        dataReview,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal server error!",
        error: e,
      });
    }
  }

  //TODO Get All Reviews
  async getAll(req, res) {
    try {
      const option = {
        page: req.query.page,
        limit: req.query.page,
        // page: 1,
        // limit: 10,
      };
      let dataReview = await review.paginate(
        { movie: req.params.movieId, deleted: false },
        options
      );
      console.log(dataReview.docs);
      let totalRating = 0;
      dataReview.docs.forEach((element) => {
        totalRating += element.rating;
      });
      console.log(totalRating);
      // dataReview.totalRating = totalRating;
      dataReview.avgrating = totalRating / dataReview.totalDocs;
      if (dataReview.totalDocs > 0) {
        res.status(200).json({ message: "Success", data: dataReview });
      } else {
        res
          .status(400)
          .json({ message: "This movie doesn't have reviewer yet!" });
      }
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
      let data = await review.findOne({
        _id: req.params.reviewId,
        deleted: false,
      });

      if (!data) {
        return res.status(400).json({
          message: "Review not found!",
        });
      }

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

  //TODO Create Review
  async create(req, res) {
    try {
      // create data
      const review = await Review.create(req.body);
      await ratingCalculation(req.body.movieId);
      // if successful
      return res.status(201).json({
        message: "Success Create Review",
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

  //TODO Update Review
  async update(req, res) {
    try {
      let review = await Review.findOneAndUpdate(
        {
          _id: req.params.reviewId,
        },
        req.body,
        {
          new: true,
        }
      );
      // If successful
      return res.status(200).json({
        message: "Success Update Review",
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
      // delete data
      await review.delete({ _id: req.params.reviewId });

      return res.status(200).json({
        message: "Success delete review",
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
