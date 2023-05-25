import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import TeamService from "../../../../../services/team.service";
import { Button } from "antd";
// import "./styles.scss";

export default function BracketsIndividualValidation() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [validationInProgress, setValidationInProgress] = useState();

  const _teamService = new TeamService();

  useEffect(() => {
    async function init() {
      const teamResponse = await _teamService.read(id);
      setTeam(teamResponse);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function initValidation() {
    team.validation = "Validando";
    delete team.unplaced;
    delete team.checked;

    await _teamService
      .update(team)
      .then((res) => {
        setValidationInProgress(true);
      })
      .catch((err) => {});
  }

  async function aproveValidation() {
    debugger;
    const teamResponse = await _teamService.read(id);
    delete teamResponse.unplaced;
    delete teamResponse.checked;
    teamResponse.validation = "Aprovado";

    debugger;
    teamResponse.knockoutPoints = teamResponse.knockoutPoints + 1;

    await _teamService
      .update(teamResponse)
      .then((res) => {
        setValidationInProgress(true);
      })
      .catch((err) => {});
  }

  async function reproveValidation() {}

  return (
    <div>
      <h1>{team?.name}</h1>

      <hr></hr>

      <div>
        <label>Atualmente o time {team?.name}</label>
        <br />
        <small>
          Preste muita atenção durante a avaliação do material, caso tenha
          dúvidas, pergunte a um discente ou docente de confiança.
        </small>
      </div>

      <div>
        {!validationInProgress ? (
          <div className="init-validation">
            <Button
              onClick={() => {
                initValidation(team);
              }}
              htmlType="submit"
              type="primary"
            >
              Começar validação
            </Button>

            <NavLink to="/admin/brackets/validation">
              <Button htmlType="submit" type="default">
                Voltar
              </Button>
            </NavLink>
          </div>
        ) : (
          <div className="init-validation">
            <NavLink to="/admin/brackets/validation">
              <Button
                onClick={() => {
                  aproveValidation();
                }}
                htmlType="submit"
                type="primary"
              >
                Aprovar
              </Button>
            </NavLink>
            <NavLink to="/admin/brackets/validation">
              <Button
                onClick={() => {
                  reproveValidation();
                }}
              >
                Reprovar
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
