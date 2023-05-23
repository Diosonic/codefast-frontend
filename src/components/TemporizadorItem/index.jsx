import { useEffect, useState } from "react";
import TeamService from "../../services/team.service";
import "./styles.scss";

export default function TemporizadorItem({ item, levelInProgress }) {
  const [segundos, setSegundos] = useState(item.time);
  const _teamService = new TeamService();

  async function updateTime(values) {
    await _teamService.update(values);
  }

  useEffect(() => {
    if (levelInProgress) {
      const timer = setInterval(async () => {
        setSegundos((prevSegundos) => prevSegundos + 1);
      }, 1000);

      if (item.validation === "Validando") {
        clearInterval(timer);
        updateTime({ id: item.id, time: segundos });
      }

      if (item.validation === "Aprovado") {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.validation, levelInProgress]);

  function checkStatus() {
    if (item.validation === "Validando") {
      return "validation";
    } else if (item.validation === "Aprovado") {
      return "approved";
    } else if (item.validation === "Declinado") {
      return "declined";
    } else {
      return "in-progress";
    }
  }

  return (
    <table>
      <tbody>
        <tr className={checkStatus()}>
          <td className="team-name">{item.name}</td>
          <td>{item.validation}</td>
          <td>{segundos}</td>
          <td className="team-points">{item.points}</td>
        </tr>
      </tbody>
    </table>
  );
}
