import { useEffect, useState, React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Popconfirm } from "antd";
import ControleEliminatoriaService from "../../../../../../../services/controleEliminatoria.service";
import TabelaAdmin from "../../../../../../../components/Admin/Tabelas";
import { Code } from "iconsax-react";

export default function OperacaoControleEliminatoria() {
  const { id } = useParams();
  const [equipesEliminatoria, setEquipesEliminatoria] = useState([]);

  const _controleEliminatoriaService = new ControleEliminatoriaService();
  const navigate = useNavigate();

  const colunasTabela = [
    {
      title: "Equipe",
      dataIndex: ["equipe", "nome"],
      key: "nome",
    },
    {
      title: "Operação",
      key: "action",
      render: (record) => (
        <>
          <div className="table-actions">
            <Popconfirm
              title="Trocar status"
              description={`Deseja trocar o status para validando"?`}
              onConfirm={() => {
                handleAlteraStatusValidacao(record);
              }}
            >
              <Code cursor="pointer" color="#37D67A" />
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    async function init() {
      debugger;
      const responseControleEliminatoria =
        await _controleEliminatoriaService.GetAllEquipesCredenciadasEliminatoria(
          id
        );

      const equipesFiltradas =
        responseControleEliminatoria.controleEliminatoriaEquipes.filter(
          (equipe) => equipe.statusValidacao !== "Validando"
        );

      setEquipesEliminatoria(equipesFiltradas);
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
        pontuacao: values.pontuacao,
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

  async function handleFinalizarEtapaEliminatoria() {
    await _controleEliminatoriaService
      .finalizarEtapaEliminatoria(id)
      .then(() => {
        alert(
          "Processos: \n 1. Foram criado as 3 rodadas mata-mata. \n 2. Classificação dos 8 primeiros \n 3. Foi criado os controles de mata-mata dos 8 colocados. \n 4. Foram criados as sementes da rodada mata-mata. \n \n Agora você será direcionado para o controle da segunda etapa."
        );

        navigate(`/admin/torneio/${id}/controles/mata-mata`);
      });
  }

  return (
    <div className="admin-page">
      <div style={{ paddingBottom: "2rem" }}>
        <h1>Operação eliminatória</h1>
      </div>

      <TabelaAdmin
        data={equipesEliminatoria}
        columns={colunasTabela}
        loading={false}
        pagination={false}
      />

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

            <Popconfirm
              title="Finalizar etapa eliminatória"
              description="Finalizar etapa eliminatória vai executar o processo para iniciar etapa mata-mata"
              okText="Sim"
              cancelText="Não"
              onConfirm={handleFinalizarEtapaEliminatoria}
            >
              <Button danger> Finalizar etapa eliminatória</Button>
            </Popconfirm>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}
