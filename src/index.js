import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import TeamRating from "./routes/app/TeamRating";
import AdminPage from "./routes/admin";
import AdminUsers from "./routes/admin/Users";
import AdminTeams from "./routes/admin/Teams";
import TeamForm from "./routes/admin/Teams/TeamsForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <TeamRating />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/teams",
        element: <AdminTeams />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/teams",
        element: <AdminTeams />,
      },
      {
        path: "/admin/teams/form",
        element: <TeamForm />,
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
