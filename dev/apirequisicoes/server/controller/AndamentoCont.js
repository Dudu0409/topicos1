const Andamento = require("../model/AndamentoSchema");
module.exports = {
  listar: async (req, res) => {
    Andamento.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    })
      .populate("Atividade")
      .populate("Colaborador")
      .sort({ titulo: 1 });
  },

  incluir: async (req, res) => {
    let obj = new Andamento(req.body);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  alterar: async (req, res) => {
    let obj = new Andamento(req.body);
    Andamento.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  excluir: async (req, res) => {
    Andamento.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json("message:ok");
    });
  },
  obterPeloId: (req, res) => {
    Andamento.findOne({ _id: req.params.id }, function (err, obj) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    })
      .populate("Atividade")
      .populate("Colaborador")
  },
  filtrar: (req, res) => {
    Andamento.find(
      {
        $or: [
          { titulo: { $regex: req.params.filtro, $options: "i" } },
          { descricao: { $regex: req.params.filtro, $options: "i" } },
        ],
      },
      function (err, obj) {
        err ? res.status(400).send(err) : res.status(200).json(obj);
      }
    )
      .populate("Atividade")
      .populate("Colaborador")
      .sort({ titulo: -1 });
  },
};
