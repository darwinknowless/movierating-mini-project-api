require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
// Express
const express = require("express");
const fileUpload = require("express-fileupload"); // Import express-fileupload

// Import Router
const reviewRoutes = require("./routes/reviewRoutes");
// const movieRoutes = require("./routes/movieRoutes");
// const casterRoutes = require("./routes/casterRoutes");
const userRoutes = require("./routes/userRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");

// Make app
const app = express();

// Body parser
app.use(express.json()); // Enable json req.body
app.use(
  express.urlencoded({
    extended: true,
  })
); // Enable req.body urlencoded

// To read form-data
app.use(fileUpload());

// Static folder (for image)
app.use(express.static("public"));

// Make routes
app.use("/review", reviewRoutes);
// app.use("/movie", movieRoutes);
// app.use("/caster", casterRoutes);
app.use("/user", userRoutes);
// app.use("/category", categoryRoutes);

// If environment is not test
if (process.env.NODE_ENV !== "test") {
  // Running server
  let PORT = 3000 || process.env.PORT;
  app.listen(PORT, () => console.log(`Server running on ${PORT}!`));
}

// Export index.js
module.exports = app;
