const mongoose = require("mongoose"); //Import mongoose
const mongooseDelete = require("mongoose-delete"); //Package to enable soft delete

//Add Schema
const CasterSchema = new mongoose.Schema(
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
CasterSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("caster", CasterSchema); //Export model
