const express = require("express");
const routes = express.Router();
const controle = require("../controller/ColaboradorCont");
// aqui defini-se as rotas do módulo e o que executar no controle
routes.route("/colaboradores").get(controle.listar);
routes.route("/colaboradores").post(controle.incluir);
module.exports = routes;
