const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  messages: {
    type: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
