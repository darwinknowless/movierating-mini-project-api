const validator = require("validator");
const crypto = require("crypto");
const path = require("path");

exports.signup = async (req, res, next) => {
  //check req.body.email is email

  let errors = [];
  if (!validator.isEmail(req.body.email)) {
    errors.push("email field must be valid");
  }

  if (
    !validator.isStrongPassword(req.body.password, { minSymbols: 0,})
  ) {
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

exports.signin = async (req, res, next) => {
  let errors = [];
  if (!validator.isEmail(req.body.email)) {
    errors.push("email field must be valid");
  }

  if (!validator.isStrongPassword(req.body.password, { minSymbols: 0,})) {
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

exports.update = async (req, res, next) => {
  //check req.body.email is email

  let errors = [];
  if (!validator.isEmail(req.body.email)) {
    errors.push("email field must be valid");
  }

  if (!validator.isStrongPassword(req.body.password, { minSymbols: 0,})) {
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

// exports.getOne = (req, res, next) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({
//       message: "parameter not valid!!! must use 24 char $ hexadec",
//     });
//   }
//   next();
// };
