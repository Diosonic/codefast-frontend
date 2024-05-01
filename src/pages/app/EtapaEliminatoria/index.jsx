import { useEffect, useState } from "react";
import TorneioService from "../../../services/torneio.service";
import { useParams } from "react-router-dom";

export default function EtapaEliminatoria() {
  const { id } = useParams();
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    const _torneioService = new TorneioService();

    async function init() {
      const responseTorneioService =
        await _torneioService.GetAllEquipesTorneioAsync(id);

        setEquipes(responseTorneioService);
    }

    init();
  }, [id]);

  return (

    <div>
        {console.log(equipes)}
    </div>
  )
}
