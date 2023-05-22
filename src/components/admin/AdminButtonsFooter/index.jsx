import { Button } from "antd";
import { NavLink } from "react-router-dom";

import "./styles.scss"

export default function AdminButtonsFooter({ routerLink, submit }) {
  return (
    <div className="admin-buttons-footer">
      {submit && (
        <Button htmlType="submit" type="primary">
          Salvar
        </Button>
      )}

      <NavLink to={routerLink}>
        <Button>Voltar</Button>
      </NavLink>
    </div>
  );
}
