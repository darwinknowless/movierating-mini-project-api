const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calcReview = async (review) => {
  const movieId = mongoose.Types.ObjectId(review.movie);
  const [aggResult] = await mongoose.model("Review").aggregate([
    { $match: { movie: { $in: [movieId] } } },
    {
      $group: {
        _id: `$movie`,
        totalRating: { $sum: `$rating` },
        totalCount: { $sum: 1 },
        10: {
          $sum: {
            $cond: [{ $eq: [`$rating`, 10] }, 1, 0],
          },
        },
        9: {
          $sum: {
            $cond: [{ $eq: [`$rating`, 9] }, 1, 0],
          },
        },
        8: {
          $sum: {
            $cond: [{ $eq: [`$rating`, 8] }, 1, 0],
          },
        },
        7: {
          $sum: {
            $cond: [{ $eq: [`$rating`, 7] }, 1, 0],
          },
        },
        6: {
          $sum: {
            $cond: [{ $eq: [`$rating`, 6] }, 1, 0],
          },
        },
        5: {
          $sum: {
            $cond: [{ $eq: [`$rating`, 5] }, 1, 0],
          },
        },
        4: {
          $sum: {
            $cond: [{ $eq: [`$rating`, 4] }, 1, 0],
          },
        },
        3: {
          $sum: {
            $cond: [{ $eq: [`$rating`, 3] }, 1, 0],
          },
        },
        2: {
          $sum: {
            $cond: [{ $eq: [`$rating`, 2] }, 1, 0],
          },
        },
        1: {
          $sum: {
            $cond: [{ $eq: [`$rating`, 1] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        averageRating: { $divide: [`$totalRating`, `$totalCount`] },
        ratings: {
          1: `$1`,
          2: `$2`,
          3: `$3`,
          4: `$4`,
          5: `$5`,
          6: `$6`,
          7: `$7`,
          8: `$8`,
          9: `$9`,
          10: `$10`,
        },
      },
    },
  ]);

  const movie = await mongoose.model(`Movie`).findOne({ _id: review.movie });

  if (!aggResult) {
    movie.averageRating = 0;
    movie.ratings = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    };
  } else {
    movie.averageRating = parseFloat(aggResult.averageRating.toFixed(2));
    movie.ratings = aggResult.ratings;
  }

  await movie.save();
};

// Review Schema
const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.pre("save", { document: true }, function (next) {
  this.isRatingUpdated = false;
  if (this.isModified("rating")) {
    this.isRatingUpdated = true;
    return next();
  }
  return next();
});

reviewSchema.post("save", function () {
  if (!this.isRatingUpdated) {
    return;
  }

  calculateReview(this);
});

// reviewSchema.pre('deleteOne', { document: true }, function() {

//     calculateReview(this);
// });

reviewSchema.post("deleteOne", { document: true }, function () {
  calculateReview(this);
});

module.exports = mongoose.model("Review", reviewSchema); //Export model
