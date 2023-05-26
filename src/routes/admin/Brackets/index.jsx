import { useEffect, useState } from "react";
import RoundService from "../../../services/round.service";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminTable from "../../../components/admin/AdminTable";
import AdminButtonsFooter from "../../../components/admin/AdminButtonsFooter";
import { Edit2, Trash } from "iconsax-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Popconfirm } from "antd";

export default function AdminBrackets() {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const _roundsService = new RoundService();

  const tableHead = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ação",
      key: "action",
      render: (record) => (
        <div className="table-actions">
          <Edit2
            onClick={() => navigate(`/admin/brackets/form/${record.id}`)}
            cursor="pointer"
            color="#37d67a"
          />

          <Popconfirm
            title="Remover rodada"
            description={`Deseja remover a rodada "${record.title}"?`}
            onConfirm={() => handleDelete(record)}
          >
            <Trash size="24" cursor="pointer" color="#f47373" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  async function handleDelete(values) {
    await _roundsService
      .delete(values.id)
      .then(() => {
        const updatedRounds = rounds.filter((round) => round.id !== values.id);
        setRounds(updatedRounds);
      })
      .catch((err) => {
        alert(err.msg);
      });
  }

  useEffect(() => {
    async function init() {
      setLoading(true);
      const roundsResponse = await _roundsService.list();

      setRounds(roundsResponse);
      setLoading(false);
    }

    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AdminHeader
        title="Rodadas"
        buttonRoute="/admin/brackets/form"
        buttonAux={
          <NavLink to="/admin/brackets/validation">
            <Button>Validar eliminatória</Button>
          </NavLink>
        }
      />
      <AdminTable data={rounds} columns={tableHead} loading={loading} />
      <AdminButtonsFooter routerLink={"/admin"} />
    </div>
  );
}
