import { Button } from "antd";
import TeamService from "../../services/team.service";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import ClassificationScoreService from "../../services/classification-score.service";

export default function ClassificationRound() {
  const _classificationScoreService = new ClassificationScoreService();

  async function newRound() {
    await _classificationScoreService.update({
      id: 1,
      inProgress: false,
    });

    const _teamService = new TeamService();
    const responseTeamService = await _teamService.list();

    responseTeamService.forEach(async (item) => {
      item.validation = "Em progresso";
      item.time = 0;

      await _teamService.update(item);
    });
  }

  return (
    <>
      <div className="buttons-classifications">
        <Button
          htmlType="submit"
          type="primary"
          onClick={() => {
            newRound();
          }}
        >
          Preparar uma nova rodada
        </Button>

        <Button
          htmlType="submit"
          type="default"
          onClick={async () => {
            await _classificationScoreService.update({
              id: 1,
              inProgress: true,
            });
          }}
        >
          Iniciar nova rodada
        </Button>

        <NavLink to="/admin">
          <Button htmlType="submit" type="text">
            Voltar
          </Button>
        </NavLink>
      </div>
    </>
  );
}
