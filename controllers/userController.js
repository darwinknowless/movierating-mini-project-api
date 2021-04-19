const { user, movie, review, caster } = require("../models");
const jwt = require("jsonwebtoken");

class UserController {
  async getToken(req, res) {
    try {
      //get the req.user from userRoutes
      // amd create body variable
      const body = {
        id: req.user._id,
        // email: req.user.email,
        // image: req.user.image,
        // pass: req.user.password,
      };

      //create jwt token with  {user{id: req.user._id}}value
      //and the key is porcess.env.JWT_SECRET
      const token = jwt.sign(body, process.env.JWT_SECRET);
      //if success

      return res.status(200).json({
        message: "Success",
        token,
      });
    } catch (e) {
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }

  async update(req, res) {
    try {
      // Update data

      let data = await user.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        req.body, // This is all of req.body
        {
          new: true,
        }
      );
      // new is to return the updated barang data
      // If no new, it will return the old data before updated

      // If success
      console.log(data);
      return res.status(201).json({
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
  //get All user
  async getAll(req, res) {
    try {
      let data = await user.find();

      //if no data
      if (!data.length) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      //if success
      return res.status(200).json({
        message: "success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }

  //Delete User
  async getOne(req, res) {
    try {
      let data = await user.findOne({
        _id: req.user.id,
      });

      return res.status(200).json({
        message: "Here is your Profile",
        data,

        // return res.status(200).send(data.nama);
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async delete(req, res) {
    try {
      // delete data
      await user.delete({ _id: req.user.id });

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

module.exports = new UserController();
