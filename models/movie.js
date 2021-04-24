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
      get: getImage,
    },
    ratingAvg: {
      type: Number,
      default: 0,
      required: false, //change soon
    },
    genre: {
      type: [String],
      default: ["Unknow"],
      require: true,
    },

    casts: 
      {
        type: [mongoose.Schema.ObjectId],
        ref: "cast",
      },
    
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

//getter function for barang
function getImage(poster) {
  return `/images/${poster}`;
}


// Reverse populate with virtuals
MovieSchema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "movie",
  justOne: false,
}); 

// Enable soft delete
MovieSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("movie", MovieSchema); //Export model
