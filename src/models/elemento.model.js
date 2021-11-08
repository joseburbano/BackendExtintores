const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const elementoSchema = new Schema({
  placa: {
    type: String,
    unique: true,
    required: true,
  },
  tipoExt: String,
  tamanio: String,
  sede: String,
  ubicacionBloque: String,
  ubicacionPiso: String,
  foto: String,
  danoFisico: String,
  observaciones: String,
  fechaCreate: Date,
  fechaUpdate: Date,
  fechaRecarga: Date,
  estadoSello: String,
  estadoPlaca: String,
  url: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  fechaVencimiento: Date,
  estado: String,
  active: Boolean,
});

module.exports = mongoose.model("elemento", elementoSchema);
