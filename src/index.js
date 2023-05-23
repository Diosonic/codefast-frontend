import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import App from "./App";
import TeamRating from "./routes/app/TeamRating";
import AdminPage from "./routes/admin";
import AdminUsers from "./routes/admin/Users";
import AdminTeams from "./routes/admin/Teams";
import TeamForm from "./routes/admin/Teams/TeamsForm";
import AdminUserForm from "./routes/admin/Users/UserForm";
import AdminValidation from "./routes/admin/Validation";
import IndividualValidation from "./routes/admin/Validation/IndividualValidation";
import TeamBrackets from "./routes/app/TeamBrackets";

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
        path: "/brackets",
        element: <TeamBrackets />,
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
      { path: "/admin/validation", element: <AdminValidation /> },
      {
        path: "/admin/user/:id/validation",
        element: <IndividualValidation />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

if (window.location.pathname === "/") {
  const rootDisplay = document.getElementById("root");
  rootDisplay.style.backgroundImage =
    "repeating-linear-gradient(45deg, transparent, transparent 34px, #0f46a2 34px, #0f46a2 68px)";

  rootDisplay.style.height = "100vh";
  rootDisplay.style.backgroundColor = "#124eb0";
}

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
