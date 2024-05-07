import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../../../../../../services/controleEliminatoria.service";

export default function ValidacaoIndividual() {
  const { idEquipe } = useParams();
  const [equipeEliminatoria, setEquipeEliminatoria] = useState();

  const _controleEliminatoriaService = new ControleEliminatoriaService();

  useEffect(() => {
    async function init() {
      const responseControleEliminatoria =
        await _controleEliminatoriaService.GetControleEliminatoriaById(
          idEquipe
        );

      setEquipeEliminatoria(responseControleEliminatoria);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEquipe]);

  return (
    <div>
      <h1>Validação {equipeEliminatoria?.equipe.nome}</h1>

      <hr />

      <button>Aprovado</button>
      <button>Declinado</button>
    </div>
  );
}
