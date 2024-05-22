import { Button, Flex, Popconfirm } from "antd";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./styles.scss";
import ControleMataMataService from "../../../../../../../services/controleMataMata.service";
import { Code, HierarchySquare3, ProfileRemove } from "iconsax-react";
import TabelaAdmin from "../../../../../../../components/Admin/Tabelas";
import TorneioService from "../../../../../../../services/torneio.service";

export default function OperacaoMataMata() {
  const { id } = useParams();
  const [controleMataMata, setControleMataMata] = useState([]);
  const [torneio, setTorneio] = useState();
  const [labelBotao, setLabelBotao] = useState("");

  const _controleMataMataService = new ControleMataMataService();
  const _torneioService = new TorneioService();

  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const controleMataMataService =
        await _controleMataMataService.GetEquipesClassificadasMataMata(id);

      const torneioResponse = await _torneioService.read(id);
      const equipesFiltradas =
        controleMataMataService.controleMataMataEquipes.filter(
          (equipe) => equipe.statusValidacao !== "Validando"
        );

      setControleMataMata(equipesFiltradas);
      setTorneio(torneioResponse);
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

            <Popconfirm
              title="Adicionar à disputa pelo terceiro lugar"
              description={`Deseja adicionar a equipe "${record.nome}"?`}
              onConfirm={() => prepararEquipeDisputaTerceiroLugar(record.id)}
            >
              <HierarchySquare3 size="24" cursor="pointer" color="#7d7626" />
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

  async function prepararChaveTerceiroLugar() {
    await _controleMataMataService
      .PrepararChaveTerceiroLugar(id)
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

  async function prepararEquipeDisputaTerceiroLugar(controleEquipeId) {
    await _controleMataMataService
      .PrepararEquipeDisputaTerceiroLugar(controleEquipeId)
      .then((res) => {})
      .catch((res) => {
        alert(res.response.data);
      });
  }

  async function AlteraStatusTempo() {
    setTorneio((prevTorneio) => ({
      ...prevTorneio,
      isTempoCorrendo: !prevTorneio.isTempoCorrendo,
    }));

    await _torneioService
      .AlteraStatusTempo(id)
      .then((res) => {})
      .catch((res) => {
        alert(res.response.data);
      });
  }

  async function ResetarStatusTempo() {
    await _torneioService
      .ResetarStatusTempo(id)
      .then((res) => {
        setTorneio((prevTorneio) => ({
          ...prevTorneio,
          isTempoCorrendo: false, // Define o status do tempo como pausado
        }));
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

            <Button
              onClick={() => {
                prepararChaveTerceiroLugar();
              }}
            >
              Preparar rodada para 3º lugar
            </Button>

            <Button
              onClick={() => {
                AlteraStatusTempo();
              }}
            >
              {torneio?.isTempoCorrendo
                ? "Pausar cronometro"
                : "Rodar cronometro"}

              {labelBotao}
            </Button>

            <Button
              onClick={() => {
                ResetarStatusTempo();
              }}
            >
              Resetar rodada
            </Button>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}
