import "./styles.scss";
import InfoLevel from "./InfoLevel";
import { useEffect, useState } from "react";
import TeamService from "../../../services/team.service";




export default function TeamRating() {
  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    async function init() {
      const _teamService = new TeamService();
      const responseTeamService = await _teamService.list();
      debugger;
      setTeamsList(responseTeamService);
    }

    init();
  }, []);

  return (
    <div className="team-rating-container">
      <InfoLevel />

      <div>
        <h3>Pontuação</h3>
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th>Tempo</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {teamsList.map((item, index) => (
              <tr key={index}>
                <td>
                  <h5>{item.name}</h5>
                </td>
                <td>{item.validation}</td>
                <td>{item.time}</td>
                <td>{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
