import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import TeamRating from "./routes/app/TeamRating";
import AdminPage from "./routes/admin";
import AdminUsers from "./routes/admin/Users";
import AdminTeams from "./routes/admin/Teams";
import TeamForm from "./routes/admin/Teams/TeamsForm";
import AdminUserForm from "./routes/admin/Users/UserForm";
import CheckIn from "./routes/admin/Check-In";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <TeamRating />,
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
        path: "/admin/checkin",
        element: <CheckIn />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/users/form",
        element: <AdminUserForm />,
      },
      {
        path: "/admin/teams",
        element: <AdminTeams />,
      },
      {
        path: "/admin/teams/form",
        element: <TeamForm />,
      },
      { path: "/admin/teams/form/:id", element: <TeamForm /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
