const mongoose = require("mongoose"); //Import mongoose
const mongooseDelete = require("mongoose-delete"); //Package to enable soft delete

//Add Schema
const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: [{
      type: String,
      required: true,
    }],
    relaseYear: {
      type: Number,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    trailer: {
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
    review: {
      type: mongoose.Schema.ObjectId,
      ref: "review",
      required: false,//change soon
    },
    caster: {
      type: mongoose.Schema.ObjectId,
      ref: "caster",
      required: false,//change soon
    },


    //TODO input your schema header column here
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    //toJSON: { getters: true },
  }
);

function getPoster(poster) {
  return `/images/${poster}`;
}

// Enable soft delete
MovieSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("movie", MovieSchema); //Export model
