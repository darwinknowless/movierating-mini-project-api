const crypto = require("crypto");
const path = require("path");

exports.uploadPhoto = async (req, res, next) => {
    //check req.body.email is email
  
    let errors = [];
    if ((req, res)) {
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
      file.mv(`./public/images/userPhoto/${file.name}`, async (err) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
            error: err,
          });
        }
      });
    }
  
    next();
  };