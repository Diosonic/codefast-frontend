import { useEffect, useState } from "react";
import TeamService from "../../services/team.service";

export default function TemporizadorItem({ item }) {
  const [segundos, setSegundos] = useState(item.time);
  const _teamService = new TeamService();

  async function updateTime(values) {
    await _teamService.update(values);
  }

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.validation]);

  return (
    <tr key={item.id}>
      <td>
        <button>Start </button>
      </td>
      <td>
        <h5>{item.name}</h5>
      </td>
      <td>{item.validation}</td>
      <td>{segundos}</td>
      <td>{item.points}</td>
    </tr>
  );
}
