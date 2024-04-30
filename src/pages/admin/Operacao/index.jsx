import { useEffect, useState, React } from "react";
import { useParams } from "react-router-dom";
import TorneioService from "../../../services/torneio.service";

export default function Operacao() {
  const { id } = useParams();
  const [torneio, setTorneio] = useState();

  useEffect(() => {
    const _torneioService = new TorneioService();

    async function init() {
      const torneioResponse = await _torneioService.read(id);
      setTorneio(torneioResponse);
    }

    init();
  }, [id]);

  return <div>{console.log(torneio)}</div>;
}
