const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const covidSchema = new Schema({
  sede: String,
  diagnosticoCovid: String,
  diasCovid: String,
  sospecha: String,
  fiebreDias: String,
  respiratoriosDias: String,
  sintomas: Array,
  sospechosoContagiado: String,
  sospechosoFamiliar: String,
  temperatura: Number,
  fechaCreate: Date,
  fecha: Date,
  url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  estado: Boolean,
  active: Boolean,
});

module.exports = mongoose.model("covid", covidSchema);
