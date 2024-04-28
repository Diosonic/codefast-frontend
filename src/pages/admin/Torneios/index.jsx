import { useEffect, useState } from "react";
import TorneioService from "../../../services/torneio.service";
import TabelaAdmin from "../../../components/Admin/Tabelas";
import { Popconfirm } from "antd";
import { ExportCircle, Trash } from "iconsax-react";
import { useNavigate } from "react-router-dom";

export default function Torneios() {
  const [torneios, setTorneios] = useState([]);

  let navigate = useNavigate();

  const colunasTabela = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Ação",
      key: "action",
      render: (record) => (
        <>
          <div className="table-actions">
            <ExportCircle
                onClick={() => navigate(`/admin/torneio/${record.id}`)}
                cursor="pointer"
                color="#37D67A"
              />
  
            <Popconfirm
              title="Remover torneio"
              description={`Deseja remover o torneio "${record.titulo}"?`}
              onConfirm={() => console.log(record)}
            >
              <Trash size="24" cursor="pointer" color="#f47373" />
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    const _torneioService = new TorneioService();

    async function init() {
      const responseTorneioService = await _torneioService.list();

      setTorneios(responseTorneioService);
    }

    init();
  }, []);

  return (
    <div>
      <TabelaAdmin data={torneios} columns={colunasTabela} loading={false} />

      {console.log(torneios)}
    </div>
  );
}

