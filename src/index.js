import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Credenciamento from "./pages/admin/Torneios/Operacao/Credenciamento";
import Operacao from "./pages/admin/Torneios/Operacao";
import Torneios from "./pages/admin/Torneios";
import CredenciamentoFormulario from "./pages/admin/Torneios/Operacao/Credenciamento/Formulario";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/admin/torneio/:id/credenciamento/:idEquipe/formulario",
        element: <CredenciamentoFormulario />,
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
