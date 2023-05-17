import { useEffect, useState } from "react";
import TeamService from "../../../services/team.service";
import { Col, Row } from "reactstrap";

import "./styles.scss";
import ConfirmationDialog from "../../../components/ConfirmationDialog";

export default function CheckIn() {
  const [teams, setTeams] = useState();
  const [teamClicked, setTeamClicked] = useState();
  const [displayDialog, setDisplayDialog] = useState(false);

  const _teamService = new TeamService();

  useEffect(() => {
    async function init() {
      const res = await _teamService.list();
      setTeams(res);
    }

    init();
  }, []);

  async function checkInUser() {
    console.log(teamClicked);

    _teamService
      .update({ checked: !teamClicked.checked, id: teamClicked.id })
      .then((res) => {
        setDisplayDialog(false);
      })
      .catch((res) => console.log(res));
  }

  return (
    <div>
      <ConfirmationDialog
        open={displayDialog}
        setOpen={setDisplayDialog}
        title="Deseja credenciar a equipe?"
        msg="Ao credenciar, essa equipe irá aparecer na listagem do raking principal."
        onConfirm={checkInUser}
      />

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
            <div
              className={team.checked ? "checked" : "not-checked"}
              onClick={() => {
                setDisplayDialog(true);
                setTeamClicked(team);
              }}
            >
              <span key={team.id}>{team.name}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
