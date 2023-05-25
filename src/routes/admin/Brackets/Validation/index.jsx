import { Judge } from "iconsax-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TeamService from "../../../../services/team.service";
import AdminHeader from "../../../../components/admin/AdminHeader";
import AdminTable from "../../../../components/admin/AdminTable";
import { Button } from "antd";
import ClassificationScoreService from "../../../../services/classification-score.service";

export default function BracketsValidation() {
  const [teamsList, setTeamsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const _classificationScoreService = new ClassificationScoreService();

  async function newRound() {
    await _classificationScoreService.update({
      id: 1,
      inProgress: false,
    });

    const _teamService = new TeamService();
    const responseTeamService = await _teamService.list();

    responseTeamService.forEach(async (item) => {
      if (!item.unplaced) {
        item.knockoutPoints = 0;
        item.time = 0;

        await _teamService.update(item);
      }
    });
  }

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
      title: "Ação",
      key: "action",
      render: (record) => (
        <>
          <Judge
            size={32}
            color="#37d67a"
            onClick={() =>
              navigate(`/admin/team/${record.id}/validation_brackets`)
            }
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

      const x = [];
      teamServiceResponse.forEach((item) => {
        if (
          item.validation === "Em progresso" &&
          item.checked &&
          !item.unplaced
        ) {
          x.push(item);
        }
      });
      setTeamsList(x);
      setLoading(false);
    }

    init();
  }, []);

  return (
    <div>
      <AdminHeader title="Validação de eliminatórias" />

      <AdminTable data={teamsList} columns={tableHead} loading={loading} />

      {JSON.parse(localStorage.getItem("AUTH_OPERATOR")) === true && (
        <div className="buttons-classifications">
          <Button
            htmlType="submit"
            type="primary"
            onClick={() => {
              newRound();
            }}
          >
            Preparar uma nova rodada
          </Button>

          <Button
            htmlType="submit"
            type="default"
            onClick={async () => {
              await _classificationScoreService.update({
                id: 1,
                inProgress: true,
              });
            }}
          >
            Iniciar nova rodada
          </Button>

          <NavLink to="/admin">
            <Button htmlType="submit" type="text">
              Voltar
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
