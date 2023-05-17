import { NavLink } from "react-router-dom";

export default function AdminPage() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/admin/checkin">Credenciamento</NavLink>{" "}
        </li>

        <li>
          <NavLink to="/admin/users">Usuários</NavLink>
        </li>

        <li>
          <NavLink to="/admin/teams">Equipes</NavLink>{" "}
        </li>
      </ul>
    </div>
  );
}
