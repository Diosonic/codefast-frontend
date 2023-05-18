import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";

// import "./styles.scss";
import { Col, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import TeamService from "../../../services/team.service";

export default function AdminValidation() {
  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    async function init() {
      debugger;
      const _teamService = new TeamService();
      const teamServiceResponse = await _teamService.list();
      setTeamsList(teamServiceResponse);
    }

    init();
  }, []);

  return (
    <div>
      <h1>Validação</h1>

      <NavLink to="/admin/users/form">
        <button>Novo</button>
      </NavLink>
      <hr />

      <Row>
        {teamsList.map((user) => (
          <Col>

            <span>{user.name}</span>
          </Col>
        ))}
      </Row>
    </div>
  );
}
