import { useEffect, useState } from "react";
import RoundService from "../../../services/round.service";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminTable from "../../../components/admin/AdminTable";
import AdminButtonsFooter from "../../../components/admin/AdminButtonsFooter";
import {  Edit2 } from "iconsax-react";
import { useNavigate } from "react-router-dom";

export default function AdminBrackets() {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

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
        <>
          <Edit2
            onClick={() => navigate(`/admin/brackets/form/${record.id}`)}
            cursor="pointer"
            color="#37d67a"
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    async function init() {
      setLoading(true);
      const _roundsService = new RoundService();
      const roundsResponse = await _roundsService.list();

      setRounds(roundsResponse);
      setLoading(false);
    }

    init();
  }, []);

  console.log(rounds);

  return (
    <div>
      <AdminHeader title="Rodadas" buttonRoute="/admin/brackets" />

      <AdminTable data={rounds} columns={tableHead} loading={loading} />

      <AdminButtonsFooter routerLink={"/admin"} />
    </div>
  );
}
