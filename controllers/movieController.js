const { user, movie, review, caster } = require("../models");

class MovieController {
  async create(req, res) {
    try {
      // Create
      let data = await movie.create(req.body);

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
      const page = parseInt(req.query.page) || 1; //for next page pass 1 here
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";
      const genre = req.query.genre;

      let parameter = {};

      if (search) {
        parameter.title = { $regex: ".*" + search + ".*", $options: "i" };
      }

      if (genre) {
        parameter.genre = genre;
      }
      let totalItems = await movie.find(parameter).countDocuments();

      const movies = await movie
        //.find(parameter)
        .find(parameter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

        if (movies.length === 0) {
          return res.status(404).json({
            message: "Movie Not Found",
          });
        }

      res.status(200).json({
        message: "succes",
        data: {
          movies: movies,
          totalItems,
          page: page,
          pageSizeLimit: movies.length,
          totalPage: Math.ceil(totalItems / limit),
        },
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  async deleteMovie(req, res, next) {
    try {
      const data = await movie.findOne({ _id: req.params.id });

      if (data === null) {
        return res.status(404).json({
          message: "Data Movie Not Found",
        });
      }

      await movie.deleteOne({ _id: req.params.id });

      return res.status(200).json({
        message: `Success, Movie ${data.title} is Deleted`,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new MovieController();
