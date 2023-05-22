import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";

import "./styles.scss";

import AdminButtonsFooter from "../../../components/admin/AdminButtonsFooter";
import AdminTable from "../../../components/admin/AdminTable";
import AdminHeader from "../../../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";
import { UserEdit } from "iconsax-react";
import { Tag } from "antd";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
  ];

  useEffect(() => {
    async function init() {
      setLoading(true);
      const userService = new UserService();
      const userResponse = await userService.list();

      setUsers(userResponse);
      setLoading(false);
    }

    init();
  }, []);

  return (
    <div>
      <AdminHeader title="Usuários" buttonRoute="/admin/users/form" />

      <AdminTable data={users} columns={tableHead} loading={loading} />

      <AdminButtonsFooter routerLink={"/admin"} />
    </div>
  );
}
