const crypto = require("crypto");
const path = require("path");
const { cast } = require("../models");

class CastController {
  async create(req, res) {
    try {
      // If image was uploaded
      //move to upload flow
     
      // Create cast data
      let createdData = await cast.create(req.body);

      console.log(req.body)

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
      let data = await cast.find();

      // If no data
      if (data.length === 0) {
        return res.status(404).json({
          message: "Cast Not Found",
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
      let data = await cast.findOne({ _id: req.params.id });

      // If data not found
      if (!data) {
        return res.status(404).json({
          message: "Cast Not Found",
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
      let data = await cast.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body, // This is all of req.body
        {
          new: true,
        }
      );
      let dataupdate = await cast.findOne({ _id: req.params.id }).populate("filmography");

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
      await cast.delete({ _id: req.params.id });

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

module.exports = new CastController();
