import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import TeamService from "../../../../services/team.service";
import { Button } from "antd";
import "./styles.scss";

export default function IndividualValidation() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [validationInProgress, setValidationInProgress] = useState();

  const _teamService = new TeamService();

  useEffect(() => {
    async function init() {
      const teamResponse = await _teamService.read(id);
      setTeam(teamResponse);

      if (teamResponse.validation === "Validando") {
        setValidationInProgress(true);
      }
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function initValidation() {
    const teamResponse = await _teamService.read(id);
    teamResponse.validation = "Validando";

    await _teamService
      .update(teamResponse)
      .then((res) => {
        setValidationInProgress(true);
      })
      .catch((err) => {});
  }

  async function aproveValidation() {
    const teamResponse = await _teamService.read(id);

    let points = 100;

    if (teamResponse.time <= 900) {
      points = 150;
    } else if (teamResponse.time <= 1200) {
      points = 125;
    } else if (teamResponse.time <= 1500) {
      points = 110;
    }

    teamResponse.validation = "Aprovado";
    teamResponse.points = teamResponse.points + points;

    await _teamService
      .update(teamResponse)
      .then((res) => {
        setValidationInProgress(false);
      })
      .catch((err) => {});
  }

  async function reproveValidation() {
    const teamResponse = await _teamService.read(id);

    let points = 25;
    teamResponse.points = teamResponse.points + points;
    teamResponse.validation = "Declinado";

    await _teamService
      .update(teamResponse)
      .then((res) => {
        setValidationInProgress(false);
      })
      .catch((err) => {});
  }

  return (
    <div>
      <h1>{team?.name}</h1>

      <hr></hr>

      <div>
        <label>
          Atualmente o time {team?.name} possui {team?.points} pontos
        </label>
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

            <NavLink to="/admin/validation">
              <Button htmlType="submit" type="default">
                Voltar
              </Button>
            </NavLink>
          </div>
        ) : (
          <div className="init-validation">
            <NavLink to="/admin/validation">
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
            <NavLink to="/admin/validation">
              <Button
                onClick={() => {
                  reproveValidation();
                }}
              >
                Reprovar
              </Button>
            </NavLink>

            <NavLink to="/admin/validation">
              <Button htmlType="submit" type="default">
                Voltar
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
