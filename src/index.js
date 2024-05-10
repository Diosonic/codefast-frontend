import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Credenciamento from "./pages/admin/Torneios/Operacao/Credenciamento";
import Operacao from "./pages/admin/Torneios/Operacao";
import Torneios from "./pages/admin/Torneios";
import CredenciamentoFormulario from "./pages/admin/Torneios/Operacao/Credenciamento/Formulario";
import EtapaEliminatoria from "./pages/app/EtapaEliminatoria";
import ControleTorneio from "./pages/admin/Torneios/Operacao/ControleTorneio";
import EtapaMataMata from "./pages/app/EtapaMataMata";
import ControleEliminatoria from "./pages/admin/Torneios/Operacao/ControleTorneio/Eliminatoria";
import ValidacaoEliminatoria from "./pages/admin/Torneios/Operacao/ControleTorneio/Eliminatoria/ValidacaoEliminatoria";
import ValidacaoIndividual from "./pages/admin/Torneios/Operacao/ControleTorneio/Eliminatoria/ValidacaoEliminatoria/ValidacaoIndividual";
import AdminMataMata from "./pages/admin/Torneios/Operacao/ControleTorneio/MataMata";
import OperacaoMataMata from "./pages/admin/Torneios/Operacao/ControleTorneio/MataMata/OperacaoMataMata";
import MataMataValidacao from "./pages/admin/Torneios/Operacao/ControleTorneio/MataMata/Validacao";
import MataMataValidacaoIndividual from "./pages/admin/Torneios/Operacao/ControleTorneio/MataMata/Validacao/ValidacaoIndividual";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/torneio/:id/etapa-eliminatoria",
        element: <EtapaEliminatoria />,
      },
      {
        path: "/torneio/:id/etapa-mata-mata",
        element: <EtapaMataMata />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "/admin",
        element: <Torneios />,
      },
      {
        path: "/admin/torneio/:id",
        element: <Operacao />,
      },
      {
        path: "/admin/torneio/:id/credenciamento",
        element: <Credenciamento />,
      },
      {
        path: "/admin/torneio/:id/credenciamento/formulario",
        element: <CredenciamentoFormulario />,
      },
      {
        path: "/admin/torneio/:id/credenciamento/:idEquipe/formulario",
        element: <CredenciamentoFormulario />,
      },
      {
        path: "/admin/torneio/:id/controles",
        element: <ControleTorneio />,
      },
      {
        path: "/admin/torneio/:id/controles/eliminatoria",
        element: <ControleEliminatoria />,
      },
      {
        path: "/admin/torneio/:id/controles/validacao",
        element: <ValidacaoEliminatoria />,
      },
      {
        path: "/admin/torneio/:id/controles/validacao/:idEquipe",
        element: <ValidacaoIndividual />,
      },
      {
        path: "/admin/torneio/:id/controles/mata-mata",
        element: <AdminMataMata />,
      },
      {
        path: "/admin/torneio/:id/controles/mata-mata/operacao",
        element: <OperacaoMataMata />,
      },
      {
        path: "/admin/torneio/:id/controles/mata-mata/validacao",
        element: <MataMataValidacao />,
      },
      {
        path: "/admin/torneio/:id/controles/mata-mata/validacao/:idEquipe",
        element: <MataMataValidacaoIndividual />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
