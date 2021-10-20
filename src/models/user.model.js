const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const { compareSync, hashSync, genSaltSync } = require("bcrypt");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  fullname: { type: String, require: true },
  cedula: {
    type: String,
    unique: true,
    require: true,
  },
  tipo: String,
  cargo: String,
  tel: Number,
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: { type: String, require: true },
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

//metodo que nos sirve para devolver datos sin enviar la contraseña cuando pidan datos del usuario
usersSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

//metodo para comparar las contraseñas
usersSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

//metodo para encryptar la contraseña usuario nuevo
usersSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
});

//metodo para encryptar la contraseña cuando actualizan
usersSchema.pre("findOneAndUpdate", async function (next) {
  const { _update } = this;
  const user = _update;

  if (!user.password) {
    return next();
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
});

//metodo para aplicar paginate
usersSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("user", usersSchema);
