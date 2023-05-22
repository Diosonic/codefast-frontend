import { NavLink } from "react-router-dom";

export default function AdminPage() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/admin/teams">Equipes</NavLink>{" "}
        </li>
        
        <li>
          <NavLink to="/admin/users">Usuários</NavLink>
        </li>
        
        <li>
          <NavLink to="/admin/validation">Validação</NavLink>{" "}
        </li>
      </ul>
    </div>
  );
}
