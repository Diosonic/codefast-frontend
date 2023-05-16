import { useEffect } from "react";
import UserService from "../../../services/user.serializer";

export default function AdminUsers() {
  useEffect(() => {
    async function init() {
      const userService = new UserService();
      const userResponse = userService.list();
      console.log(userResponse);
    }

    init();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      <hr />
    </div>
  );
}
