import "./styles.scss";
import InfoLevel from "./InfoLevel";
import { useEffect, useState } from "react";
import TeamService from "../../../services/team.service";
import TemporizadorItem from "../../../components/TemporizadorItem";

export default function TeamRating() {
  const [teamsList, setTeamsList] = useState([]);
  const _teamService = new TeamService();

  useEffect(() => {
    setInterval(async () => {
      const responseTeamService = await _teamService.list();
      setTeamsList(responseTeamService);
    }, 5000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function init() {
      const responseTeamService = await _teamService.list();
      debugger;
      setTeamsList(responseTeamService);
    }

    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="team-rating-container">
      <InfoLevel />

      <div>
        <h3>Pontuação</h3>
        <table className="ranking-table">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Status</th>
              <th>Tempo</th>
              <th>Pontuação</th>
            </tr>
          </thead>

          <tbody>
            {teamsList.map((item) => (
              <TemporizadorItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
