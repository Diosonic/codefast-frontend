import { useEffect, useState, React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../../../../../services/controleEliminatoria.service";
import { Button, Flex } from "antd";

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
    <div className="admin-page">
      <div>
        <h1>Validação Eliminatória</h1>
      </div>

      {equipesEliminatoria?.map((equipe) => (
        <div
          className="listagem-validacao"
          onClick={() =>
            navigate(
              `/admin/torneio/${id}/controles/eliminatoria/validacao/${equipe.id}`
            )
          }
        >
          <br />

          <h2>{equipe.equipe.nome}</h2>
        </div>
      ))}

      <Flex
        gap="small"
        wrap
        style={{ paddingTop: "2rem" }}
        justify={"space-between"}
      >
        <Button
          onClick={() =>
            navigate(`/admin/torneio/${id}/controles/eliminatoria`)
          }
        >
          Voltar
        </Button>

        <Button
          onClick={() => navigate(`/torneio/${id}/etapa-eliminatoria`)}
          type="primary"
        >
          Ir para placar ao vivo
        </Button>
      </Flex>
    </div>
  );
}
