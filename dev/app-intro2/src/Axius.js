import React, { useEffect, useState } from "react";
import api from "./services/api";

export default function App() {
  const [colaborador, setColaborador] = useState();

  useEffect(() => {
    api
      .get("/colaboradores")
      .then((response) => setColaborador(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <div className="App">
      <p>ID: {colaborador?.id}</p>
      <p>Nome: {colaborador?.nome}</p>
      <p>Email: {colaborador?.email}</p>
      <p>Senha: {colaborador?.senha}</p>
    </div>
  );
}
