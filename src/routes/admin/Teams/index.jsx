import { useEffect, useState } from "react";
import TeamService from "../../../services/team.service";
import AdminTable from "../../../components/admin/AdminTable";
import AdminButtonsFooter from "../../../components/admin/AdminButtonsFooter";
import AdminHeader from "../../../components/admin/AdminHeader";
import { Card, CardTick1, Edit, Edit2 } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { Popconfirm, Tag } from "antd";

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
      title: "Ação",
      key: "action",
      render: (record) => (
        <>
          <Edit2
            onClick={() => navigate(`/admin/teams/form/${record.id}`)}
            cursor="pointer"
            color="#37d67a"
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

  return (
    <div>
      <AdminHeader title="Equipes" buttonRoute="/admin/teams/form" />

      <AdminTable data={teams} columns={tableHead} loading={loading} />

      <AdminButtonsFooter routerLink={"/admin"} />
    </div>
  );
}
