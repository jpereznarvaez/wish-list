const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { versionKey: false }
);

userSchema.methods.encryptPassword = password => {
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync());
  return hash;
};

userSchema.methods.matchPassword = function(password) {
  const match = bcrypt.compareSync(password, this.password);
  return match;
};

module.exports = model("User", userSchema);