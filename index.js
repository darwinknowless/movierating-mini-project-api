require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Express
const fs = require("fs");
const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload"); // Import express-fileupload

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// Import Router
const reviewRoutes = require("./routes/reviewRoutes");
const movieRoutes = require("./routes/movieRoutes");
const castRoutes = require("./routes/castRoutes");
const userRoutes = require("./routes/userRoutes");

// Make App
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
// Sanitize data
app.use(mongoSanitize());
// Prevent XSS attact
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());
// Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {
      flags: "a",
    }
  );

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}

// Static folder (for image)
app.use(express.static("public"));

// Make routes
app.use("/review", reviewRoutes);
app.use("/movie", movieRoutes);
app.use("/cast", castRoutes);
app.use("/user", userRoutes);

// If environment is not test
if (process.env.NODE_ENV !== "test") {
  // Running server
  let PORT = 3000 || process.env.PORT;
  app.listen(PORT, () => console.log(`Server running on ${PORT}!`));
}

// Export index.js
module.exports = app;
