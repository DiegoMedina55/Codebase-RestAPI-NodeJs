const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const validRoles = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "Error, {VALUE} is not a valid role.",
};

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: [true, "the name is mandatory"],
  },
  password: {
    type: String,
    require: [true, "the password is mandatory"],
  },
  email: {
    type: String,
    unique: true,
    require: [true, "the email is mandatory"],
  },
  img: {
    type: String,
    require: [false],
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: validRoles,
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  // ommit password in response
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

module.exports = mongoose.model("User", userSchema);
