const mongoose = require("mongoose");
const AndamentoSchema = new mongoose.Schema({
  dataHora: { type: Date, required: true },
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  Atividade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Atividade",
    require: true,
  },
  Colaborador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Colaborador",
    require: true,
  },
});
module.exports = mongoose.model("Andamento", AndamentoSchema);
