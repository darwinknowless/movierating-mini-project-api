const crypto = require("crypto");
const path = require("path");

exports.uploadPoster = (req, res, next) => {
  try {
    if (req.files) {
      const file = req.files.poster;

      // Make sure poster
      if (!file.mimetype.startsWith("image")) {
        return res.status(400).json({ message: "Poster must be an image" });
      }

      // Check file size (max 10MB)
      if (file.size > 10000000) {
        return res
          .status(400)
          .json({ message: "Poster must be less than 10MB" });
      }

      // Create custom filename
      let fileName = crypto.randomBytes(16).toString("hex");

      // Rename the file
      file.name = `${fileName}${path.parse(file.name).ext}`;

      // assign req.body. poster with file.name
      req.body.poster = file.name;

      // Upload  poster to /public/images
      file.mv(`./public/images/${file.name}`, async (err) => {
        if (err) {
          console.error(err);

          return res.status(500).json({
            message: "Internal Server Error at upload",
            error: err,
          });
        }
      });
    }
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

exports.uploadPhoto = async (req, res, next) => {
  try {
    if (req.files) {
      const file = req.files.photo;

      //validator for image
      if (!file.mimetype.startsWith("image")) {
        errors.push("Photo Profil must less tahn 1MB");
      }

      //create custom filename
      let fileName = crypto.randomBytes(16).toString("hex");

      //renaming the file
      file.name = `${fileName}${path.parse(file.name).ext}`;

      //assign req.body.image with file.name
      req.body.photo = file.name;

      //Upload image to /public/image
      file.mv(`./public/images/${file.name}`, async (err) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error tu",
            error: err,
          });
        }
      });
    }

    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

exports.uploadCastPhoto = async (req, res, next) => {
  try {
    if (req.files) {
      const file = req.files.image;

      //validator for image
      if (!file.mimetype.startsWith("image")) {
        errors.push("Image must less tahn 1MB");
      }

      //create custom filename
      let fileName = crypto.randomBytes(16).toString("hex");

      //renaming the file
      file.name = `${fileName}${path.parse(file.name).ext}`;

      //assign req.body.image with file.name
      req.body.image = file.name;

      //Upload image to /public/image
      file.mv(`./public/images/${file.name}`, async (err) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
            error: err,
          });
        }
      });
    }

    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};
