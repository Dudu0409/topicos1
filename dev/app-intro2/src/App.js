import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense, lazy, useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import LoginForm from "./pages/login/LoginForm";

const Home = lazy(() => import("./pages/home/Home"));
const ColaboradorCon = lazy(() => import("./pages/colaborador/ColaboradorCon"));
const SolicitanteCon = lazy(() => import("./pages/solicitante/SolicitanteCon"));
const TipoRequisicaoCon = lazy(() =>
  import("./pages/tipoRequisicao/TipoRequisicaoCon")
);
const RequisicaoCon = lazy(() => import("./pages/requisicao/RequisicaoCon"));
const AtividadeCon = lazy(() => import("./pages/atividade/AtividadeCon"));
const AndamentoCon = lazy(() => import("./pages/andamento/AndamentoCon"));

function App() {
  const [token, setToken] = useState([]);
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  if (!token || token <= "") {
    return <LoginForm />;
  }
  return (
    <BrowserRouter>
      <Menu />
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/colaboradores" element={<ColaboradorCon />} />
          <Route path="/solicitantes" element={<SolicitanteCon />} />
          <Route path="/tiposRequisicoes" element={<TipoRequisicaoCon />} />
          <Route path="/requisicoes" element={<RequisicaoCon />} />
          <Route path="/atividades" element={<AtividadeCon />} />
          <Route path="/andamentos" element={<AndamentoCon />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function Menu() {
  let navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Cadastros",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Colaboradores",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/colaboradores");
          },
        },
        {
          label: "Solicitantes",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            navigate("/solicitantes");
          },
        },
        {
          label: "Tipos de Requisições",
          icon: "pi pi-fw pi-bars",
          command: () => {
            navigate("/tiposRequisicoes");
          },
        },
        {
          label: "Requisições",
          icon: "pi pi-fw pi-ticket",
          command: () => {
            navigate("/requisicoes");
          },
        },
        {
          label: "Atividades",
          icon: "pi pi-fw pi-pencil",
          command: () => {
            navigate("/atividades");
          },
        },
        {
          label: "Andamentos",
          icon: "pi pi-fw pi-book",
          command: () => {
            navigate("/andamentos");
          },
        },
      ],
    },
    {
      label: "Sair",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        sessionStorage.setItem("token", "");
      },
      url: "/",
    },
  ];

  return <Menubar model={items} />;
}

export default App;
