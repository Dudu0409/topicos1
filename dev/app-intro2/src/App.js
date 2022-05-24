import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense, lazy } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";

const Home = lazy(() => import("./pages/home/Home"));
const ColaboradorCon = lazy(() => import("./pages/colaborador/ColaboradorCon"));

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/colaboradores" element={<ColaboradorCon />} />
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
      ],
    },
    {
      label: "Sair",
      icon: "pi pi-fw pi-power-off",
    },
  ];

  return <Menubar model={items} />;
}

export default App;
