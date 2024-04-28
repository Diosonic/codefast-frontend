import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Torneios from "./pages/admin/Torneios";
import Operacao from "./pages/admin/Operacao";


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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
