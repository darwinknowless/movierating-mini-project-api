const mongoose = require("mongoose"); //Import mongoose
const mongooseDelete = require("mongoose-delete"); //Package to enable soft delete

//Add Schema
const ReviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            required: true,
        },
        movie: {
            type: mongoose.Schema.ObjectId,
            ref: "movie",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
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
ReviewSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("review", ReviewSchema); //Export model
