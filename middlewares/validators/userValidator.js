const validator = require("validator");

exports.signup = async (req, res, next) => {
  try {
    let errors = [];

    // Check email
    if (!validator.isEmail(req.body.email)) {
      errors.push("Email field must be valid email");
    }

    // Check password strength
    if (!validator.isStrongPassword(req.body.password)) {
      errors.push(
        "Password needs (uppercase & lowercase characters, number, and symbol)"
      );
    }

    // Check password confirmation
    if (req.body.confirmPassword !== req.body.password) {
      errors.push("Password confirmation must be same as password");
    }

    // If errors
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    let errors = [];

    // Check email
    if (!validator.isEmail(req.body.email)) {
      errors.push("Email field must be valid email");
    }

    // Check password strength
    if (!validator.isStrongPassword(req.body.password)) {
      errors.push(
        "Password needs (uppercase & lowercase characters, number, and symbol)"
      );
    }

    // If errors
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
