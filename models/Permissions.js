const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  key: {
    type: Schema.Types.ObjectId,
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: "menu",
  },
  active: Boolean,
});

module.exports = mongoose.model("permission", permissionSchema);
