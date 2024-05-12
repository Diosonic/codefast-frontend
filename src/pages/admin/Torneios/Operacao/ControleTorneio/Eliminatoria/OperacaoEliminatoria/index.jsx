import { useEffect, useState, React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Popconfirm } from "antd";
import ControleEliminatoriaService from "../../../../../../../services/controleEliminatoria.service";

export default function OperacaoControleEliminatoria() {
  const { id } = useParams();
  const [equipesEliminatoria, setEquipesEliminatoria] = useState([]);

  const _controleEliminatoriaService = new ControleEliminatoriaService();
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const responseControleEliminatoria =
        await _controleEliminatoriaService.GetAllEquipesCredenciadasEliminatoria(
          id
        );

      setEquipesEliminatoria(
        responseControleEliminatoria.controleEliminatoriaEquipes
      );
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleAlteraStatusValidacao(values) {
    debugger;
    await _controleEliminatoriaService
      .AlteraStatusValidacao({
        id: values.id,
        statusValidacao: "Validando",
        pontuacao: values.pontuacao
      })
      .then(() => {
        const equipesAtualizadas = equipesEliminatoria.filter(
          (equipe) => equipe.id !== values.id
        );

        setEquipesEliminatoria(equipesAtualizadas);
      })
      .catch((err) => {
        alert(err.msg);
      });
  }

  async function handleIniciarNovaRodada() {
    await _controleEliminatoriaService.iniciarNovaRodada(id).then(() => {
      window.location.reload();
    });
  }

  async function handleFinalizarRodadaAtual() {
    await _controleEliminatoriaService.finalizarRodadaAtual(id).then(() => {
      window.location.reload();
    });
  }

  return (
    <div className="admin-page">
      <div>
        <h1>Operação eliminatória</h1>
      </div>

      {equipesEliminatoria?.map((equipe) => (
        <>
          {equipe.statusValidacao === "Em progresso" && (
            <Popconfirm
              title="Trocar status"
              description={`Deseja trocar o status para validando"?`}
              onConfirm={() => handleAlteraStatusValidacao(equipe)}
            >
              <div className="listagem-validacao">
                <h2>{equipe.equipe.nome}</h2>
              </div>
            </Popconfirm>
          )}
        </>
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

        <div>
          <Flex gap="small" wrap>
            <Button
              type="primary"
              onClick={() => {
                handleIniciarNovaRodada();
              }}
            >
              Começar rodada
            </Button>

            <Button
              onClick={() => {
                handleFinalizarRodadaAtual();
              }}
            >
              Finalizar rodada
            </Button>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}
