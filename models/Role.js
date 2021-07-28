const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  permission: [
    {
      type: Schema.Types.ObjectId,
      ref: "permission",
    },
  ],
  menus: [
    {
      type: Schema.Types.ObjectId,
      ref: "menu",
    },
  ],
});

module.exports = mongoose.model("role", roleSchema);
