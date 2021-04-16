const validator = require("validator");
const crypto = require("crypto");
const path = require("path");

exports.signup = async (req, res, next) => {
  //check req.body.email is email

  let errors = [];
  if (!validator.isEmail(req.body.email)) {
    errors.push("email field must be valid");
  }

  if (!validator.isStrongPassword(req.body.password)) {
    errors.push(
      "password must contain min 8 chars, min 1 UpperCase, min 1 LowerCase, 1 numb, 1 symbol"
    );
  }

  //check pasword confirmation
  if (req.body.confirmPassword !== req.body.password) {
    errors.push("password confirmation must be same to password");
  }

  //if error >0, it will maKe errors message joined with ,
  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }
  next();
};

//=======================FOR IMAGE UPLOAD==================
// exports.uploadPhoto = async (req, res, next) => {
//   //check req.body.email is email

//   let errors = [];
//   if ((req, res)) {
//     const file = req.files.image;

//     //validator for image
//     if (!file.mimetype.startsWith("image")) {
//       errors.push("Image must less tahn 1MB");
//     }

//     //create custom filename
//     let fileName = crypto.randomBytes(16).toString("hex");

//     //renaming the file
//     file.name = `${fileName}${path.parse(file.name).ext}`;

//     //assign req.body.image with file.name
//     req.body.image = file.name;

//     //Upload image to /public/image
//     file.mv(`./public/images/${file.name}`, async (err) => {
//       if (err) {
//         return res.status(500).json({
//           message: "Internal Server Error",
//           error: err,
//         });
//       }
//     });
//   }

//   next();
// };

exports.signin = async (req, res, next) => {
  let errors = [];
  if (!validator.isEmail(req.body.email)) {
    errors.push("email field must be valid");
  }

  if (!validator.isStrongPassword(req.body.password)) {
    errors.push(
      "password must contain min 8 chars, min 1 UpperCase, min 1 LowerCase, 1 numb, 1 symbol"
    );
  }
  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }

  next();
};
