const { Schema, Types, default: mongoose, mongo } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    id: {
      type: Types.ObjectId,
    },
    fullname: {
      type: String,
      required: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email) {
          return validator.isEmail(email);
        },
        message: "Enter a valid email",
      },
    },
    password: {
      type: String,
      unique: true,
      minlength: 6,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("Users", userSchema);
