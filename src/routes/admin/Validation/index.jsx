import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamService from "../../../services/team.service";
import AdminTable from "../../../components/admin/AdminTable";
import AdminHeader from "../../../components/admin/AdminHeader";
import { Judge } from "iconsax-react";
import ClassificationRound from "../../../components/ClassificationsRound";
import { Tag } from "antd";

export default function AdminValidation() {
  const [teamsList, setTeamsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      title: "Validação",
      dataIndex: "validation",
      key: "validation",
      render: (record) =>
        record === "Validando" ? (
          <Tag color="yellow" bordered={false}>
            {record}
          </Tag>
        ) : (
          <Tag color="blue" bordered={false}>
            {record}
          </Tag>
        ),
    },
    {
      title: "Ação",
      key: "action",
      render: (record) => (
        <>
          <Judge
            size={32}
            color="#37d67a"
            onClick={() => navigate(`/admin/user/${record.id}/validation`)}
            cursor="pointer"
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    async function init() {
      setLoading(true);
      const _teamService = new TeamService();
      const teamServiceResponse = await _teamService.list();

      const teamServiceFiltered = teamServiceResponse.filter(
        (item) => item.checked === true && item.unplaced === false
      );

      const validation = [];

      teamServiceFiltered.forEach((item) => {
        if (
          item.validation === "Validando" ||
          item.validation === "Em progresso"
        ) {
          validation.push(item);
        }
      });

      setTeamsList(validation);
      setLoading(false);
    }

    init();
  }, []);

  return (
    <div>
      <AdminHeader title="Validação" />

      <AdminTable data={teamsList} columns={tableHead} loading={loading} />

      {JSON.parse(localStorage.getItem("AUTH_OPERATOR")) === true && (
        <ClassificationRound />
      )}
    </div>
  );
}
