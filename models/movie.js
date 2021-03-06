const mongoose = require("mongoose"); //Import mongoose
const mongooseDelete = require("mongoose-delete"); //Package to enable soft delete

//Add Schema
const MovieSchema = new mongoose.Schema(
  {
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
