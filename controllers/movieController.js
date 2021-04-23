const { user, movie, review, cast } = require("../models");

class MovieController {
  async create(req, res) {
    try {
      // Create
      let data = await movie.create(req.body);
      let newcast = await cast.updateMany(
        { _id: req.body.casts },
        { $push: { filmography: data._id } },
        { new: true }
      );
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

  async updateMovieCast(req, res) {
    try {
      const updatecast = await movie.updateMany(
        { _id: req.params.id },
        { $push: { casts: req.body.casts } },
        { new: true }
      );

      return res.status(200).json({
        message: "Success Update",
        data: updatecast,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  async updateMovie(req, res) {
    try {
      const update = await movie.updateOne({ _id: req.params.id }, req.body, {
        new: true,
      });
      console.log(update)

      if (update === null) {
        return res.status(404).json({
          message: "Movie Not Found",
        });
      }

      return res.status(200).json({
        message: "Success Update",
        data: update,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
  async getAll(req, res) {
    try {
      const page = parseInt(req.params.page) || 1; //for next page pass 1 here
      const limit = parseInt(req.query.limit) || 10;
      let totalItems = await movie.find({}).countDocuments();

      const dataMovie = await movie
        .find({})
        .select("poster title genre")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      if (dataMovie === null) {
        return res.status(404).json({
          message: "Movie Not Found",
        });
      }

      res.status(200).json({
        message: "succes",
        data: {
          movies: dataMovie,
          totalItems,
          page: page,
          pageSizeLimit: dataMovie.length,
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

  async getMoviebyCategory(req, res) {
    try {
      const page = parseInt(req.params.page) || 1; //for next page pass 1 here
      const limit = 10;
      let total = await movie
        .find({ category: req.body.category })
        .countDocuments();

      const skip = (page - 1) * limit;

      const dataMoviebyCategory = await movie
        .find({
          category: req.body.category,
        })
        .skip(skip)
        .limit(limit);

        console.log({ category: req.body.category })

      if (dataMoviebyCategory.length === 0) {
        return res.status(404).json({
          message: "Data Movie Not Found",
        });
      }
      return res.status(200).json({
        message: "Success Get Movie by Category",
        data: {
          movies: dataMoviebyCategory,
          total,
          page: page,
          pageSizeLimit: dataMoviebyCategory.length,
          totalPage: Math.ceil(total / limit),
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

  async getMoviebyTitle(req, res) {
    try {
      const search = req.query.search;

      const dataSearch = await movie
        .find({ title: { $regex: search, $options: "i" } })
        .limit(10);

      if (dataSearch.length === 0) {
        return res.status(404).json({
          message: "Data Movie Not Found",
        });
      }
      return res.status(200).json({
        message: "Success Get Movie by Search",
        data: dataSearch,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getMovieAllReviews(req, res) {
    try {
      const dataOne = await movie
        .findOne({ _id: req.params.id })
        .select("title ratingAvg synopsis urlTrailer")
        .populate("reviews")
        //.populate("categorys")
        //.populate("casts");

      if (dataOne === null) {
        return res.status(404).json({
          message: "Data Movie Not Found",
        });
      }

      return res.status(200).json({
        message: "success",
        data: dataOne,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getAllCastInMovie(req, res) {
    try {
      const dataOne = await movie
        .findOne({ _id: req.params.id })
        .select("title ratingAvg synopsis urlTrailer")
        .populate("casts");
       

      if (dataOne === null) {
        return res.status(404).json({
          message: "Data Movie Not Found",
        });
      }

      return res.status(200).json({
        message: "success",
        data: dataOne,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getOne(req, res) {
    try {
      const dataOne = await movie
        .findOne({ _id: req.params.id })

      if (dataOne === null) {
        return res.status(404).json({
          message: "Data Movie Not Found",
        });
      }

      return res.status(200).json({
        message: "success",
        data: dataOne,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async deleteMovie(req, res) {
    try {
      const data = await movie.findOne({ _id: req.params.id });

      if (data === null) {
        return res.status(404).json({
          message: "Data Movie Not Found",
        });
      }

      await review.deleteMany({ _id: { $in: data.reviews } });

      await movie.deleteOne({ _id: req.params.id });

      return res.status(200).json({
        message: `Success, Movie ${data.title} is Deleted`,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new MovieController();
