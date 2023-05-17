import { useEffect, useState } from "react";
import TeamService from "../../../services/team.service";
import { Col, Row } from "reactstrap";

import "./styles.scss";

export default function CheckIn() {
  const [teams, setTeams] = useState();

  useEffect(() => {
    async function init() {
      const _teamService = new TeamService();
      const res = await _teamService.list();
      setTeams(res);
    }

    init();
  }, []);


  return (
    <div>
      <h1>Credenciamento</h1>
      <hr />

      <p>
        Bem vindo a tela de credenciamento, a seguir a listagem das equipes.
      </p>
      <p>
        Para credenciar apenas dar um toque no nome da equipe. Cor verde
        significa que a equipe já está credenciada, vermelhas não.
      </p>

      <Row>
        {teams?.map((team) => (
          <Col sm="6" md="6" lg="6" xl="6">
            <div className={team.checked ? "checked" : "not-checked"}>
              <span key={team.id}>{team.name}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
