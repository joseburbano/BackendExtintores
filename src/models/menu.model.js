const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  span: {
    type: String,
    required: true,
  },
  active: Boolean,
});

module.exports = mongoose.model("menu", menuSchema);
