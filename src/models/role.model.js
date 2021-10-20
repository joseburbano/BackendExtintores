const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permission: [
    {
      type: Schema.Types.ObjectId,
      ref: "permission",
      required: true,
    },
  ],
  menus: [
    {
      type: Schema.Types.ObjectId,
      ref: "menu",
      required: true,
    },
  ],
});

module.exports = mongoose.model("role", roleSchema);
