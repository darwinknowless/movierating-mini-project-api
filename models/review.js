const mongoose = require("mongoose"); // Import mongoose
const mongooseDelete = require("mongoose-delete"); //Package to enable soft delete

// Add Schema
const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add title for the review"],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, "Please add some text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add rating between 1 and 10"],
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: "movie",
    required: true, // Change Soon
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true, // Change Soon
  },
});

// Prevent user for submitting more than one review per movie
ReviewSchema.index({ movie: 1, user: 1 }, { unique: true });

// Static method to get averaga rating
ReviewSchema.statics.getAverageRating = async function (movieId) {
  const obj = await this.aggregate([
    {
      $match: { movie: movieId },
    },
    {
      $group: {
        _id: "$movie",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("movie").findByIdAndUpdate(movieId, {
      averageRating: obj[0].averageRating,
    });
  } catch (e) {
    console.error(e);
  }
};

// call getAverageCost after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.movie);
});

// call getAverageCost after remove
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.movie);
});

module.exports = mongoose.model("review", ReviewSchema); //Export model
