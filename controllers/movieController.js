const { user, movie, review, caster } = require("../models");



class MovieController {async create(req, res) {
    try {
      // Create 
      let createdData = await movie.create(req.body);

      let data = await movie
        .findOne({ _id: createdData._id })
        .populate("movie");

      // If success
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }}

module.exports = new MovieController();