const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const elementoSchema = new Schema({
  placa: {
    type: String,
    unique: true,
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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },

  fechaVencimiento: Date,
  estado: String,
  active: Boolean,
});

elementoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("elemento", elementoSchema);
