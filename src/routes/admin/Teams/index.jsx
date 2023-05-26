import { useEffect, useState } from "react";
import TeamService from "../../../services/team.service";
import AdminTable from "../../../components/admin/AdminTable";
import AdminButtonsFooter from "../../../components/admin/AdminButtonsFooter";
import AdminHeader from "../../../components/admin/AdminHeader";
import { CardTick1, Edit2, PlayRemove, Trash } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { Popconfirm, Tag } from "antd";
import "./styles.scss";

export default function AdminTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const _teamService = new TeamService();

  const tableHead = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Credenciamento",
      dataIndex: "checked",
      key: "checked",
      render: (record) =>
        record ? (
          <Tag color="green" bordered={false}>
            Credenciado
          </Tag>
        ) : (
          <Tag color="red" bordered={false}>
            Não credenciado
          </Tag>
        ),
    },
    {
      title: "Classificação",
      dataIndex: "unplaced",
      key: "unplaced",
      render: (record) =>
        !record ? (
          <Tag color="green" bordered={false}>
            Classificado
          </Tag>
        ) : (
          <Tag color="red" bordered={false}>
            Desclassificado
          </Tag>
        ),
    },
    {
      title: "Usuários",
      dataIndex: "users",
      key: "users",
      render: (record) =>
        record.map((item, index) =>
          index <= 1 ? item.name + ", " : item.name + "."
        ),
    },
    {
      title: "Ação",
      key: "action",
      render: (record) => (
        <>
          <div className="table-actions">
            <Edit2
              onClick={() => navigate(`/admin/teams/form/${record.id}`)}
              cursor="pointer"
              color="#FFAB00"
            />

            <Popconfirm
              title={
                record.checked ? "Descredenciar equipe" : "Credenciar equipe"
              }
              description={
                record.checked
                  ? `Deseja descredenciar a equipe ${record.name}?`
                  : `Deseja credenciar a equipe ${record.name}?`
              }
              onConfirm={() => checkInUser(record)}
            >
              <CardTick1 cursor="pointer" color="#37d67a" />
            </Popconfirm>

            <Popconfirm
              title={
                !record.unplaced
                  ? "Desclassificar equipe"
                  : "Classificar equipe"
              }
              description={
                !record.unplaced
                  ? `Deseja desclassificar a equipe ${record.name}?`
                  : `Deseja classificar a equipe ${record.name}?`
              }
              onConfirm={() => unplaceTeam(record)}
            >
              <PlayRemove cursor="pointer" color="#f47373" />
            </Popconfirm>

            <Popconfirm
              title="Remover equipe"
              description={`Deseja remover a equipe "${record.name}"?`}
              onConfirm={() => handleDelete(record)}
            >
              <Trash size="24" cursor="pointer" color="#f47373" />
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    async function init() {
      setLoading(true);
      const responseTeamService = await _teamService.list();

      setTeams(responseTeamService);
      setLoading(false);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(values) {
    await _teamService
      .delete(values.id)
      .then(() => {
        const updatedTeams = teams.filter((round) => round.id !== values.id);
        setTeams(updatedTeams);
      })
      .catch((err) => {
        alert(err.msg);
      });
  }

  async function checkInUser(record) {
    const updatedTeams = teams.map((team) => {
      if (team.id === record.id) {
        return { ...team, checked: !record.checked };
      }
      return team;
    });

    setLoading(true);

    _teamService
      .update({ checked: !record.checked, id: record.id })
      .then((res) => {
        setTeams(updatedTeams);
        setLoading(false);
      })
      .catch((res) => {
        setLoading(false);
      });
  }

  async function unplaceTeam(record) {
    const updatedTeams = teams.map((team) => {
      if (team.id === record.id) {
        return { ...team, unplaced: !record.unplaced };
      }
      return team;
    });

    await _teamService
      .update({ unplaced: !record.unplaced, id: record.id })
      .then((res) => {
        setTeams(updatedTeams);
        setLoading(false);
      })
      .catch((res) => {
        setLoading(false);
      });
  }

  return (
    <div>
      <AdminHeader title="Equipes" buttonRoute="/admin/teams/form" />

      <AdminTable data={teams} columns={tableHead} loading={loading} />

      <AdminButtonsFooter routerLink={"/admin"} />
    </div>
  );
}
