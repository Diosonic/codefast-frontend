import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";

import "./styles.scss";

import AdminButtonsFooter from "../../../components/admin/AdminButtonsFooter";
import AdminTable from "../../../components/admin/AdminTable";
import AdminHeader from "../../../components/admin/AdminHeader";
import { Popconfirm } from "antd";
import { Trash } from "iconsax-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const userService = new UserService();

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
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Ação",
      key: "action",
      render: (record) => (
        <>
          <div className="table-actions">
            <Popconfirm
              title="Remover usuário"
              description={`Deseja o usuário "${record.name}"?`}
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
      const userResponse = await userService.list();

      setUsers(userResponse);
      setLoading(false);
    }

    init();
  }, []);

  async function handleDelete(values) {
    await userService
      .delete(values.id)
      .then(() => {
        const updatedUsers = users.filter((round) => round.id !== values.id);
        setUsers(updatedUsers);
      })
      .catch((err) => {
        alert(err.msg);
      });
  }

  return (
    <div>
      <AdminHeader title="Usuários" buttonRoute="/admin/users/form" />

      <AdminTable data={users} columns={tableHead} loading={loading} />

      <AdminButtonsFooter routerLink={"/admin"} />
    </div>
  );
}
