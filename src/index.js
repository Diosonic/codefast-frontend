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
import AdminValidation from "./routes/admin/Validation";
import IndividualValidation from "./routes/admin/Validation/IndividualValidation";
import TeamBrackets from "./routes/app/TeamBrackets";
import AdminBrackets from "./routes/admin/Brackets";
import AdminBracketsForm from "./routes/admin/Brackets/BracketsForm";
import ClassificationRound from "./components/ClassificationsRound";
import Operator from "./routes/admin/Operator";
import BracketsValidation from "./routes/admin/Brackets/Validation";
import BracketsIndividualValidation from "./routes/admin/Brackets/Validation/IndividualValidation";

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
      {
        path: "/admin/classification-round",
        element: <ClassificationRound />,
      },
      {
        path: "/admin/brackets",
        element: <AdminBrackets />,
      },
      {
        path: "/admin/brackets/form",
        element: <AdminBracketsForm />,
      },
      {
        path: "/admin/brackets/form/:id",
        element: <AdminBracketsForm />,
      },
      {
        path: "/admin/operator",
        element: <Operator />,
      },
      {
        path: "/admin/brackets/validation",
        element: <BracketsValidation />,
      },
      {
        path: "/admin/team/:id/validation_brackets",
        element: <BracketsIndividualValidation />,
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
