const mongoose = require("mongoose"); //Import mongoose
const mongooseDelete = require("mongoose-delete"); //Package to enable soft delete

//Add Schema
const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type:[String],
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
    urlTrailer: {
      type: String,
      default: null,
      required: false,
    },
    urlPoster: {
      type: String,
      default: null,
      required: false,
     
    },
    rating: {
      type: Number,
      default: 0,
      required: false,//change soon
    },
    caster: {
      type: [mongoose.Schema.ObjectId],
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


// Enable soft delete
MovieSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("movie", MovieSchema); //Export model
