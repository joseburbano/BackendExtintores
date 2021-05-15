const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  fullname: String,
  cedula: {
    type: String,
    unique: true,
  },
  tipo: String,
  cargo: String,
  tel: Number,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  fechaCreate: Date,
  userUpdate: Date,
  rol: String,
  avatar: String,
  elementos: [
    {
      type: Schema.Types.ObjectId,
      ref: "elemento",
    },
  ],
  participas: [
    {
      type: Schema.Types.ObjectId,
      ref: "participacion",
    },
  ],
  covids: [
    {
      type: Schema.Types.ObjectId,
      ref: "covid",
    },
  ],
  active: Boolean,
});
usersSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("user", usersSchema);
