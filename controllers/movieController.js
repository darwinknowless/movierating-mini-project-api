const { user, movie, review, caster } = require("../models");
const mongoosePaginate = require("mongoose-paginate-v2");

class MovieController {
  async create(req, res) {
    try {
      // Create
      let createdData = await movie.create(req.body);

      let data = await movie.create(req.body);
      // .findOne({ _id: createdData._id })
      //.populate("movie");

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
  }

  async getAll(req, res) {
    try {
      const getAll = await movie.find().populate("reviews").populate("caster");
      return res.status(200).json({
        message: "Success",
        result: getAll,
      });
    } catch (e) {
      res.status(500).json({
        message: "Internal Server Error ",
        error: e,
      });
    }
  }
}

module.exports = new MovieController();
