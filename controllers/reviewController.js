const Review = require("../models/review");
const User = require("../models/user");
const Movie = require("../models/movie");
// for validation & error
const handler = require("../utils/errorHandler");
// for show only user review
const mine = [
  {
    // find movie by id
    $lookup: {
      from: Movie.collection.name,
      localField: "movie",
      foreignField: "_id",
      as: "movie",
    },
  },
  {
    // find user by id
    $lookup: {
      from: User.collection.name,
      localField: "reviewer",
      foreignField: "_id",
      as: "reviewer",
    },
  },
  {
    $project: {
      _id: 0,
      id: "$_id",
      review: "$review",
      rating: "$rating",
      movie: {
        $let: {
          vars: {
            firstMovie: { $arrayElemAt: ["$movie", 0] },
          },
          in: { id: "$$firstMovie._id", title: "$$firstMovie.title" },
        },
      },
      reviewer: {
        $let: {
          vars: {
            firstReviewer: { $arrayElemAt: ["$reviewer", 0] },
          },
          in: {
            id: "$$firstReviewer._id",
            userName: "$$firstReviewer.userName",
            name: "$$firstReviewer.name",
          },
        },
      },
      createdAt: "$createdAt",
      updatedAt: "$updatedAt",
    },
  },
];

const singleReview = async (reviewId) => {
  const [review] = await Review.aggregate([
    { $match: { _id: reviewId } },
    ...mine,
  ]);
  return review;
};

const ITEMS_SHOW = 5;

const obtain = "Successfully obtain the reviews";

exports.addReview = async (req, res, next) => {
  try {
    handler(req, res, next);
    // Create review
    const addingReview = new Review({
      review: req.body.review,
      rating: req.body.rating,
      movie: req.body.movie,
      reviewer: req.body.id,
    });
    // Response save from user
    await addingReview.save();
    // If success
    return res.status(201).json({
      message: "Success",
      data: addingReview,
    });
    // If failed
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.allReviews = async (req, res, next) => {
  try {
    handler(req, res, next);

    const movieId = req.query.movie;
    const page = +req.query.page || 1;
    // If ID Movie not match
    if (!movieId) {
      const error = new Error("Not specified ID movie");
      error.statusCode = 422;
      throw error;
    }
    // Aggregate function
    const mines = [
      { $match: { movie: movieId } },
      { $sort: { createdDate: -1 } },
      {
        $facet: {
          data: [
            { $skip: (page - 1) * ITEMS_SHOW },
            { $limit: ITEMS_SHOW },
            ...mine,
          ],
          totalItems: [{ $count: "count" }],
        },
      },
      { $unwind: "$totalItems" },
      {
        $project: {
          data: 1,
          totalItems: "$totalItems.count",
          totalPages: {
            $ceil: { $divide: ["$totalItems.count", ITEMS_SHOW] },
          },
        },
      },
    ];
    // Call aggregate function on [const mines]
    const reviews = await Review.aggregate(mines);
    // If no reviews in list
    if (!reviews["0"]?.data.length) {
      const err = new Error("Review list is empty");
      err.statusCode = 404;
      throw err;
    }
    // If success
    res.status(200).json({
      success: true,
      message: obtain,
      ...reviews["0"],
    });
    // If failed
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.userReviews = async (req, res, next) => {
  try {
    handler(req, res, next);

    const userId = req.params.userId;
    const page = +req.query.page || 1;
    // Aggregate function
    const mines = [
      { $match: { reviewer: userId } },
      { $sort: { createdDate: -1 } },
      {
        $facet: {
          data: [
            { $skip: (page - 1) * ITEMS_SHOW },
            { $limit: ITEMS_SHOW },
            ...mine,
          ],
          totalItems: [{ $count: "count" }],
        },
      },
      { $unwind: "$totalItems" },
      {
        $project: {
          data: 1,
          totalItems: "$totalItems.count",
          totalPages: {
            $ceil: { $divide: ["$totalItems.count", ITEMS_SHOW] },
          },
        },
      },
    ];

    if (page !== 1) {
      mines.unshift({
        $skip: page * ITEMS_SHOW,
      });
    }

    mines.unshift({ $match: { reviewer: userId } });

    // Call aggregate function on [const mines]
    const reviews = await Review.aggregate(mines);
    // If no reviews in list
    if (!reviews["0"]?.data.length) {
      const err = new Error("Review list is empty");
      err.statusCode = 404;
      throw err;
    }
    // If success
    res.status(200).json({
      success: true,
      message: obtain,
      ...reviews["0"],
    });
    // If failed
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.singleReview = async (req, res, next) => {
  try {
    handler(req, res, next);

    const reviewId = req.params.reviewId;

    const review = await singleReview(reviewId);
    // If no data
    if (!review) {
      const error = new Error("Review can't be found");
      error.statusCode = 404;
      throw error;
    }
    // If data found
    res.status(200).json({
      message: obtain,
      data: review,
    });
    // If failed
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editReview = async (req, res, next) => {
  try {
    handler(req, res, next);

    const reviewId = req.params.reviewId;
    // Find review
    let review = await Review.findById(reviewId);
    // If not found
    if (!review) {
      const error = new Error("Could not find review");
      error.statusCode = 404;
      throw error;
    }
    // If not authorize
    if (review.reviewer.toString() !== req.user.id) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }
    const contents = req.body.review;
    const rating = req.body.rating;

    review.review = contents || review.review;
    review.rating = rating || review.rating;

    const result = await review.save();

    review = await singleReview(reviewId);

    res.status(200).json({
      success: true,
      message: "Review updated",
      data: review,
    });
    // If failed
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    handler(req, res, next);
    const reviewId = req.params.reviewId;

    const review = await Review.findById(reviewId);
    // If no data
    if (!review) {
      const error = new Error("Could not find Review");
      error.statusCode = 404;
      throw error;
    }
    // If not authorize
    if (review.reviewer.toString() !== req.user.id) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Deleted Review",
    });
    // If failed
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
