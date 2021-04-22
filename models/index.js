const mongoose = require("mongoose"); // Import mongoose

const uri = process.env.MONGO_URI; // Add URI Mongo Atlas

// Connect to mongoDB
mongoose
  .connect(uri, {
    useUnifiedTopology: true, // Must be added
    useNewUrlParser: true, // Must be added
    useCreateIndex: true, // Use to enable unique data type
    useFindAndModify: false, // Use findOneAndUpdate instead of findAndModify
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

// Import models
const cast = require("./cast");
const movie = require("./movie");
const review = require("./review");
const user = require("./user"); // Import Auth
const category = require("./category")
// Export models
module.exports = { cast, movie, review, user, category };
