import { Button, Flex, Popconfirm } from "antd";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControleMataMataService from "../../../../../../../services/controleMataMata.service";

import "./styles.scss";
import { Code } from "iconsax-react";
import TabelaAdmin from "../../../../../../../components/Admin/Tabelas";

export default function MataMataValidacao() {
  const { id } = useParams();
  const [controleMataMata, setControleMataMata] = useState([]);

  const _controleMataMataService = new ControleMataMataService();

  const navigate = useNavigate();

  const colunasTabela = [
    {
      title: "Equipe",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Operação",
      key: "action",
      render: (record) => (
        <>
          <div className="table-actions">
            <Popconfirm
              title={`Validar ${record.nome}`}
              description={`Deseja ir para a validação"?`}
              onConfirm={() => {
                navigate(
                  `/admin/torneio/${id}/controles/mata-mata/validacao/${record.id}`
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
      const controleMataMataService =
        await _controleMataMataService.GetAllEquipesCredenciadasValidando(id);

      setControleMataMata(controleMataMataService.controleMataMataEquipes);
    }

    init();
  }, [id]);

  return (
    <div className="admin-page">
      <div style={{ paddingBottom: "2rem" }}>
        <h1>Validação Mata-Mata</h1>
      </div>

      <TabelaAdmin
        data={controleMataMata}
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
          onClick={() => navigate(`/admin/torneio/${id}/controles/mata-mata`)}
        >
          Voltar
        </Button>

        <Button
          onClick={() => navigate(`/torneio/${id}/etapa-mata-mata`)}
          type="primary"
        >
          Ir para placar ao vivo
        </Button>
      </Flex>
    </div>
  );
}
