const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete"); // Import mongoose-delete
const Schema = mongoose.Schema;

// Review Schema
const ReviewSchema = new Schema(
  {
    review: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      required: [true, "Please rate between 0 and 5"],
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "movie",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// // only permits user to submit one review per movie
// ReviewSchema.index({ movie: 1, user: 1 }, { unique: true });

// // Static method to get average rating
// ReviewSchema.statics.getAverageRating = async function (movieId) {
//   const obj = await this.aggregate([
//     {
//       $match: { movie: movieId },
//     },
//     {
//       /*fix this */
//       $group: {
//         _id: "$movie",
//         nRating: { $sum: 1 },
//         averageRating: { $avg: "$rating" },
//       },
//     },
//   ]);

//   try {
//     await this.model("Movie").findByIdAndUpdate(movieId, {
//       nRating: obj.length > 0 ? obj[0].nRating : 0,
//       averageRating: obj.length > 0 ? obj[0].averageRating : 0,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// // call getAverageRating after posting review
// ReviewSchema.post("save", function () {
//   this.constructor.getAverageRating(this.movie);
// });

// // call getAverageRating after deleting review
// ReviewSchema.pre("remove", function () {
//   this.constructor.getAverageRating(this.movie);
// });

// enable soft delete
ReviewSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("review", ReviewSchema); //Export model
