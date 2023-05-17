import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TeamService from "../../../services/team.service";

export default function AdminTeams() {
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    async function init() {
      const _teamService = new TeamService();
      const responseTeamService = await _teamService.list();

      setTeamList(responseTeamService);
    }

    init();
  }, []);

  return (
    <div>
      <h1>Times</h1>

      <NavLink to="/admin/teams/form">
        <button>Novo</button>
      </NavLink>

      <hr />

      {teamList.map((team) => (
        <div>
          <NavLink to={`/admin/teams/form/${team.id}`}>
            <h5>{team.name}</h5>
          </NavLink>
        </div>
      ))}
    </div>
  );
}
