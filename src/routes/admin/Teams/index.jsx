import { NavLink } from "react-router-dom";

export default function AdminTeams() {
  return (
    <div>
      <h1>Times</h1>

      <NavLink to="/admin/teams/form">
        <button>Novo</button>
      </NavLink>

      <hr />
    </div>
  );
}
