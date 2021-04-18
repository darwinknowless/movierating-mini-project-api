const mongoose = require("mongoose"); //Import mongoose
const mongooseDelete = require("mongoose-delete"); //Package to enable soft delete
const bcrypt = require('bcrypt');

//Add Schema
const UserSchema = new mongoose.Schema(
  {
    //TODO input your schema header column here
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: encryptPassword,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    profilPhoto: {
      type: String,
      default: "urlPhoto",
      required: false,
      //get
      get: getImage,
    },
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { getters: true },
  }
);

//getter function for barang
function getImage(image) {
  return `/images/userPhoto${image}`;
}

//encrypting the password
function  encryptPassword(password){
  const encryptedPassword =  bcrypt.hashSync(password, 10);
  return encryptedPassword;
}
// Enable soft delete
UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("user", UserSchema); //Export model
