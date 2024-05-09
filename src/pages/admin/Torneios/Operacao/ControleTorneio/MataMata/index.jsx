import { Col, Row } from "antd";
import { React } from "react";
import { NavLink, useParams } from "react-router-dom";

export default function AdminMataMata() {
  const { id } = useParams();

  return (
    <Row gutter={[48, 48]}>
      <Col span={8}>
        <div style={{ backgroundColor: "lightcoral" }}>
          <NavLink
            // to={`/admin/torneio/${id}/credenciamento`}
            className="menu-card"
          >
            Validação
          </NavLink>
        </div>
      </Col>

      <Col span={8}>
        <div style={{ backgroundColor: "lightcoral" }}>
          <NavLink to={`/admin/torneio/${id}/controles/mata-mata/operacao`} className="menu-card">
            Operação
          </NavLink>
        </div>
      </Col>
    </Row>
  );
}
