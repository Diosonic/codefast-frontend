import { useEffect, useState, React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../../../../../services/controleEliminatoria.service";
import { Button, Flex, Popconfirm } from "antd";
import { Code } from "iconsax-react";
import TabelaAdmin from "../../../../../../../components/Admin/Tabelas";

export default function ValidacaoEliminatoria() {
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
              title={`Validar ${record.equipe.nome}`}
              description={`Deseja ir para a validação"?`}
              onConfirm={() => {
                navigate(
                  `/admin/torneio/${id}/controles/eliminatoria/validacao/${id}`
                );
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
      <div style={{ paddingBottom: "2rem" }}>
        <h1>Validação Eliminatória</h1>
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
