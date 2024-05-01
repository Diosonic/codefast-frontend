import { useEffect, useState, React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TorneioService from "../../../../../services/torneio.service";
import TabelaAdmin from "../../../../../components/Admin/Tabelas";
import { Card, Edit, Trash } from "iconsax-react";
import { Popconfirm } from "antd";
import EquipeService from "../../../../../services/equipe.service";

export default function Credenciamento() {
  const { id } = useParams();
  const [equipes, setEquipes] = useState([]);
  const _equipeService = new EquipeService();

  const navigate = useNavigate();

  const colunasTabela = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Nomes participantes",
      dataIndex: "nomeParticipantes",
      key: "nomeParticipantes",
    },
    {
      title: "Ação",
      key: "action",
      render: (record) => (
        <>
          <div className="table-actions">
            <Edit
              onClick={() =>
                navigate(
                  `/admin/torneio/${id}/credenciamento/${record.id}/formulario`
                )
              }
              cursor="pointer"
              color="#37D67A"
            />

            <Popconfirm
              title="Remover torneio"
              description={`Deseja remover a equipe "${record.nome}"?`}
              onConfirm={() => {
                deletarEquipe(record);
              }}
            >
              <Trash size="24" cursor="pointer" color="#f47373" />
            </Popconfirm>
          </div>
        </>
      ),
    },
    {
      title: "Credenciamento",
      key: "action",
      render: (record) => (
        <div className="table-actions">
          <Popconfirm
            title="Credenciar"
            description={`Deseja credenciar essa a equipe "${record.nome}"?`}
            onConfirm={() => credenciarEquipe(record)}
          >
            {record.isCredenciado ? (
              <Card size="24" cursor="pointer" color="#37D67A" />
            ) : (
              <Card size="24" cursor="pointer" color="#f47373" />
            )}
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const _torneioService = new TorneioService();

    async function init() {
      const torneioResponse = await _torneioService.GetAllEquipesTorneioAsync(
        id
      );
      setEquipes(torneioResponse.equipes);
    }

    init();
  }, [id]);

  async function credenciarEquipe(values) {
    values.isCredenciado = !values.isCredenciado;

    await _equipeService
      .update(values)
      .then((res) => {
        const updatedEquipes = equipes.map((equipe) =>
          equipe.id === res.id ? res : equipe
        );

        setEquipes(updatedEquipes);
      })
      .catch((err) => {});
  }

  async function deletarEquipe(values) {
    await _equipeService
      .delete(values.id)
      .then(() => {
        const equipesAtualizadas = equipes.filter(
          (equipe) => equipe.id !== values.id
        );
        setEquipes(equipesAtualizadas);
      })
      .catch((err) => {
        alert(err.msg);
      });
  }

  return (
    <div>
      <TabelaAdmin
        botaoAdicionarLabel="Adicionar nova equipe"
        linkAdicionarItem={`/admin/torneio/${id}/credenciamento/formulario`}
        data={equipes}
        columns={colunasTabela}
        loading={false}
      />
    </div>
  );
}
