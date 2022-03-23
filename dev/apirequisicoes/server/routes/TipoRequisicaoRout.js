const express = require("express");
const routes = express.Router();
const controle = require("../controller/TipoRequisicaoCont");

routes.route("/tiposrequisicao").get(controle.listar);
routes.route("/tiposrequisicao").post(controle.incluir);
routes.route("/tiposrequisicao").put(controle.alterar);
routes.route("/tiposrequisicao/:id").delete(controle.excluir);
routes.route("/tiposrequisicao/:id").get(controle.obterPeloId);
routes.route("/tiposrequisicao/filtro/:filtro").get(controle.filtrar);
module.exports = routes;
