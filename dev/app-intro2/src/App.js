import "./App.css";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ColaboradorList from "./ColaboradorList";
import ColaboradorForm from "./ColaboradorForm";

function App() {
  let colaboradorList = [
    { id: 1, nome: "Eduardo", email: "185961@upf.br", senha: "9859256" },
    { id: 2, nome: "Daniel", email: "admin@admin.br", senha: "senha" },
  ];
  const [colaboradores, setColaboradores] = useState(colaboradorList);
  const onClickAtualizar = () => {
    colaboradorList = [
      {
        id: 1,
        nome: "Eduardo alterado",
        email: "185961@upf.br",
        senha: "9859256",
      },
      { id: 2, nome: "Daniel", email: "admin@admin.br", senha: "senha" },
      {
        id: 3,
        nome: "Roberto",
        email: "robertinhoxd@live.com",
        senha: "a4875617",
      },
    ];
    setColaboradores(colaboradorList);
  };
  const excluir = (id) => {
    setColaboradores(
      colaboradores.filter((colaborador) => colaborador.id !== id)
    );
  };
  const initialState = { id: null, nome: "", email: "", senha: "" };
  const [colaborador, setColaborador] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setColaborador(initialState);
    setEditando(true);
  };
  const salvar = () => {
    console.log("Salvar ...");
    if (colaborador.id == null) {
      colaborador.id = colaboradores.length + 1;
      setColaboradores([...colaboradores, colaborador]);
    } else {
      // alteração
      setColaboradores(
        colaboradores.map((find) =>
          find.id === colaborador.id ? colaborador : find
        )
      );
    }
    setEditando(false);
  };
  const cancelar = () => {
    console.log("Cancelou ...");
    setEditando(false);
  };

  const editar = (id) => {
    setColaborador(
      colaboradores.filter((colaborador) => colaborador.id == id)[0]
    );
    setEditando(true);
  };

  if (!editando) {
    return (
      <div className="App">
        <ColaboradorList
          colaborador={colaboradores}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ColaboradorForm
          colaborador={colaborador}
          setColaborador={setColaborador}
          salvar={salvar}
          cancelar={cancelar}
        />
      </div>
    );
  }
}

export default App;
