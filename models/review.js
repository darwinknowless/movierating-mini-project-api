const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete"); // Import mongoose-delete


// Review Schema
const ReviewSchema = new mongoose.Schema(
  {
    user : {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    movie : {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref : 'movie',
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Prevent user for submitting more than one review per movie
ReviewSchema.index({ user: 1, movie: 1 }, { unique: true });

// Static method to get averaga rating
ReviewSchema.statics.getAverageRating = async function (movieId) {

  const obj = await this.aggregate([
    {
      $match: { movie: movieId },
    },
    {
      $group: {
        _id: "$movie",
        ratingAvg: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("movie").findByIdAndUpdate(movieId, {
      ratingAvg: obj[0].ratingAvg,
    });
  } catch (e) {
    console.error(e);
  }
};

// call getAverageCost after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.movie);
});

// call getAverageCost after update
ReviewSchema.post("update", function () {
  this.constructor.getAverageRating(this.movie);
});

// call getAverageCost after remove
ReviewSchema.post("remove", function () {
  this.constructor.getAverageRating(this.movie);
});



// enable soft delete
ReviewSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("review", ReviewSchema); //Export model
