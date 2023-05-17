import { useEffect, useState } from "react";
import TeamService from "../../../services/team.service";

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

  console.log(teams)

  return (
    <div>
      <h1>Credenciamento</h1>
      <hr />

      {teams?.map((team) => (
        <span>{team.name}</span>
      ))}
    </div>
  );
}
