import { Flex, Popconfirm } from "antd";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./styles.scss";
import { Button } from "antd/es/radio";
import ControleMataMataService from "../../../../../../../services/controleMataMata.service";
import { Code, ProfileRemove } from "iconsax-react";
import TabelaAdmin from "../../../../../../../components/Admin/Tabelas";

export default function OperacaoMataMata() {
  const { id } = useParams();
  const [controleMataMata, setControleMataMata] = useState([]);

  const _controleMataMataService = new ControleMataMataService();

  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const controleMataMataService =
        await _controleMataMataService.GetEquipesClassificadasMataMata(id);

      const equipesFiltradas =
        controleMataMataService.controleMataMataEquipes.filter(
          (equipe) => equipe.statusValidacao !== "Validando"
        );

      setControleMataMata(equipesFiltradas);
    }

    init();
  }, [id]);

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
              title="Alterar status"
              description={`Deseja alterar o status para validando"?`}
              onConfirm={() => alterarStatusValidacao(record.id, "Validando")}
            >
              <Code cursor="pointer" color="#37D67A" />
            </Popconfirm>

            <Popconfirm
              title="Desclassificar equipe"
              description={`Deseja desclassificar a equipe "${record.nome}"?`}
              onConfirm={() => desclassificarEquipe(record.id)}
            >
              <ProfileRemove size="24" cursor="pointer" color="#f47373" />
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];

  async function prepararNovaRodada() {
    await _controleMataMataService
      .PrepararEtapaMataMata(id)
      .then((res) => {
        window.location.reload();
      })
      .catch((res) => {
        alert(res.response.data);
      });
  }

  async function alterarStatusValidacao(controleEquipeId, status) {
    await _controleMataMataService
      .AlteraStatusValidacaoMataMata({
        id: controleEquipeId,
        statusValidacao: status,
      })
      .then((res) => {
        const equipesAtualizadas = controleMataMata.filter(
          (equipe) => equipe.id !== controleEquipeId
        );

        setControleMataMata(equipesAtualizadas);
      })
      .catch((res) => {
        alert(res.response.data);
      });
  }

  async function desclassificarEquipe(controleEquipeId) {
    await _controleMataMataService
      .DesclassificarEquipe(controleEquipeId)
      .then((res) => {
        const equipesAtualizadas = controleMataMata.filter(
          (equipe) => equipe.id !== controleEquipeId
        );

        setControleMataMata(equipesAtualizadas);
      })
      .catch((res) => {
        alert(res.response.data);
      });
  }

  return (
    <div className="admin-page">
      <div style={{ paddingBottom: "2rem" }}>
        <h1>Operação mata-mata</h1>
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

        <div>
          <Flex gap="small" wrap>
            <Button
              htmlType="submit"
              type="primary"
              onClick={() => {
                prepararNovaRodada();
              }}
            >
              Preparar nova rodada
            </Button>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}
