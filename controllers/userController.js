const { user, movie, review, caster } = require("../models");
const jwt = require("jsonwebtoken");

class UserController {
  async getToken(req, res) {
    try {
      //get the req.user from authRoutes
      // amd create body variable
      const body = {
        id: req.user._id,
      };

      //create jwt token with  {user{id: req.user._id}}value
      //and the key is porcess.env.JWT_SECRET
      const token = jwt.sign(body, process.env.JWT_SECRET);
      //if success
      return res.status(200).json({
        message: "sukses",
        token,
      });
    } catch (e) {
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }
}

module.exports = new UserController();
