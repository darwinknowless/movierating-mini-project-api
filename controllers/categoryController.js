const { category, movie } = require("../models");

class CategoryController {
  async create(req, res) {
    try {
      // If image was uploaded
      //move to upload flow

      // Create cast data
      let createdData = await category.create(req.body);

      console.log(req.body);

      // find created data and join with cast
      // let data = await cast.findOne({ _id: createdData._id }).populate("movie");
      // console.log(data.populate("movie"))
      // If success
      return res.status(201).json({
        message: "Success",
        createdData,
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
      // Find all data
      let data = await category.find().populate("movies");

      // If no data
      if (data.length === 0) {
        return res.status(404).json({
          message: "Category Not Found",
        });
      }

      // If success
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  // Get One Cast
  async getOne(req, res) {
    try {
      // Find one data
      let data = await category
        .findOne({ _id: req.params.id })
        .populate("movies");

      // If data not found
      if (!data) {
        return res.status(404).json({
          message: "Category Not Found",
        });
      }

      // If Success
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  // Update cast
  async update(req, res) {
    try {
      // Update data
      let data = await category.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body, // This is all of req.body
        {
          new: true,
        }
      );
      let dataupdate = await category
        .findOne({ _id: req.params.id })
        .populate("filmography");

      // If success
      return res.status(201).json({
        message: "Success",
        dataupdate,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  // Delete cast
  async delete(req, res) {
    try {
      // delete data
      await category.delete({ _id: req.params.id });

      return res.status(200).json({
        message: "Success",
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new CategoryController();
