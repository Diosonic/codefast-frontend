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
import ControleEliminatoria from "./pages/admin/Torneios/Operacao/ControleTorneio/ControleEliminatoria";
import ControleTorneio from "./pages/admin/Torneios/Operacao/ControleTorneio";
import ValidacaoEliminatoria from "./pages/admin/Torneios/Operacao/ControleTorneio/ValidacaoEliminatoria";
import ValidacaoIndividual from "./pages/admin/Torneios/Operacao/ControleTorneio/ValidacaoEliminatoria/ValidacaoIndividual";

const router = createBrowserRouter([
  {
    path: "/torneio/:id/etapa-eliminatoria",
    element: <App />,
    children: [
      {
        path: "",
        element: <EtapaEliminatoria />,
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
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
