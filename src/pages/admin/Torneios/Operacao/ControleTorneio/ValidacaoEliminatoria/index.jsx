import { useEffect, useState, React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../../../../services/controleEliminatoria.service";

export default function ValidacaoEliminatoria() {
  const { id } = useParams();
  const [equipesEliminatoria, setEquipesEliminatoria] = useState([]);

  const _controleEliminatoriaService = new ControleEliminatoriaService();

  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const responseControleEliminatoria =
        await _controleEliminatoriaService.GetAllEquipesCredenciadasValidando(
          id
        );

      setEquipesEliminatoria(
        responseControleEliminatoria.controleEliminatoriaEquipes
      );
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h1>Validação</h1>

      <hr />

      {equipesEliminatoria?.map((equipe) => (
        <div
          style={{ display: "flex", gap: "20px" }}
          onClick={() =>
            navigate(`/admin/torneio/${id}/controles/validacao/${equipe.id}`)
          }
        >
          <br />

          <h1>{equipe.equipe.nome}</h1>
          <p>{equipe.statusValidacao}</p>
        </div>
      ))}
    </div>
  );
}
