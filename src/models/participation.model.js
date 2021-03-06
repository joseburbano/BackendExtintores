const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participationSchema = new Schema({
  claseRiesgoLocativo: String,
  condicionInsegura: String,
  primerosAuxilios: String,
  relacionTrabajo: String,
  lugar: String,
  descripcionNovedad: String,
  motivoRazon: String,
  medidasImplementar: String,
  fechaCreate: Date,
  fecha: Date,
  avatar: String,
  url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  estado: Boolean,
  active: Boolean,
});

module.exports = mongoose.model("participacion", participationSchema);
