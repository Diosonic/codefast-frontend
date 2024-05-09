import { useEffect, useState, React } from "react";
import { useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../../../../services/controleEliminatoria.service";
import { Popconfirm } from "antd";

export default function ControleEliminatoria() {
  const { id, idTorneio } = useParams();
  const [equipesEliminatoria, setEquipesEliminatoria] = useState([]);

  const _controleEliminatoriaService = new ControleEliminatoriaService();

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

  async function handleAlteraStatusValidacao(equipe) {
    await _controleEliminatoriaService.AlteraStatusValidacao({
      id: equipe.id,
      statusValidacao: "Validando",
    });
  }

  async function handleIniciarNovaRodada() {
    await _controleEliminatoriaService.iniciarNovaRodada(id);
  }

  async function handleFinalizarRodadaAtual() {
    await _controleEliminatoriaService.finalizarRodadaAtual(id);
  }

  return (
    <div>
      <h1>Controle de eliminatória</h1>

      <hr />

      {equipesEliminatoria?.map((equipe) => (
        <Popconfirm
          title="Remover torneio"
          description={`Deseja remover o torneio"?`}
          onConfirm={() => handleAlteraStatusValidacao(equipe)}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <br />

            <h1>{equipe.equipe.nome}</h1>
            <p>{equipe.statusValidacao}</p>
          </div>
        </Popconfirm>
      ))}

      <button
        onClick={() => {
          handleIniciarNovaRodada();
        }}
      >
        Começar nova rodada
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          handleFinalizarRodadaAtual();
        }}
      >
        Finalizar rodada
      </button>
    </div>
  );
}
