import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";

import "./styles.scss";
import { Row } from "reactstrap";
import { NavLink } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function init() {
      debugger;
      const userService = new UserService();
      const userResponse = await userService.list();
      setUsers(userResponse);
    }

    init();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>

      <NavLink to="/admin/users/form">
        <button>Novo</button>
      </NavLink>
      <hr />

      <Row>
        {users.map((user) => (
          <span>{user.name}</span>
        ))}
      </Row>
    </div>
  );
}
