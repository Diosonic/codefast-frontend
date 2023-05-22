import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamService from "../../../../services/team.service";

export default function IndividualValidation() {
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
    debugger;
    team.validation = "Validando";

    await _teamService
      .update(team)
      .then((res) => {
        setValidationInProgress(true);
      })
      .catch((err) => {});
  }

  async function aproveValidation() {
    team.validation = "Aprovado";
    team.time = 0;
    team.points = team.points + 100;

    await _teamService
      .update(team)
      .then((res) => {
        setValidationInProgress(false);
      })
      .catch((err) => {});
  }

  async function reproveValidation() {
    team.validation = "Declinado";
    debugger;
    await _teamService
      .update(team)
      .then((res) => {
        setValidationInProgress(false);
      })
      .catch((err) => {});
  }

  return (
    <div>
      <h1>Você está validando o grupo {team?.name}!</h1>
      <hr></hr>

      <div>
        {!validationInProgress ? (
          <>
            <button
              onClick={() => {
                initValidation(team);
              }}
            >
              Começar validação
            </button>
            <button>Voltar</button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                aproveValidation();
              }}
            >
              Aprovar
            </button>
            <button
              onClick={() => {
                reproveValidation();
              }}
            >
              Reprovar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
