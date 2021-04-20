const mongoose = require("mongoose"); //Import mongoose
const mongooseDelete = require("mongoose-delete"); //Package to enable soft delete

//Add Schema
const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    studios: {
      type: String,
      default: "Anonymous",
      required: true,
    },
    urlTrailer: {
      type: String,
      default: null,
      required: false,
    },
    poster: {
      type: String,
      default: null,
      required: false,
      // Getter
      get: getPoster,
    },
    // required False, get rating from review model
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    // Number of review count
    nRating: {
      type: Number,
      default: 0,
    },
    category: {
      type: [String],
      default: ["Unknow"],
      require: true,
    },

    casts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cast",
      },
    ],

    //TODO input your schema header column here
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { getters: true },
  }
);

// Image getter
function getPoster(poster) {
  return `/images/moviePoster/${poster}`;
}

// Enable soft delete
MovieSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Movie", MovieSchema); //Export model
