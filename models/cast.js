const mongoose = require("mongoose"); // Import mongoose
const Schema = mongoose.Schema;
const CastSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    // birthdate: {
    //   type: Date,
    //   required: false,
    // },
    // age: {
    //   type: Number,
    //   required: false,
    // },
    image: {
      type: String,
      default: null,
      required: false,
      // Getter
      get: getImage,
    },
    filmography: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "movie",
        required: false,
      },
    ],
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { getters: true }, // Enable getter
  }
);

// Getter function for cast
function getImage(image) {
  if (!image) {
    return null;
  }

  return `/images/${image}`;
}

module.exports = mongoose.model("cast", CastSchema); // Export cast model
