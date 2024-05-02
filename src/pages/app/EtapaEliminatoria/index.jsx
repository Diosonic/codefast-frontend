import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../services/controleEliminatoria.service";

export default function EtapaEliminatoria() {
  const { id } = useParams();
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    const _controleEliminatoriaService = new ControleEliminatoriaService();

    async function init() {
      debugger;
      const responseTorneioService =
        await _controleEliminatoriaService.GetAllEquipesCredenciadasEliminatoria(
          id
        );

      setEquipes(responseTorneioService);
    }

    init();
  }, [id]);

  return (
    <div>
      Etapa
      {equipes.map((equipe) => (
        <h1>{equipe.nome}</h1>
      ))}
    </div>
  );
}
