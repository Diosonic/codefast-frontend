import { Col, Row } from "antd";
import { useEffect, useState, React } from "react";
import { NavLink, useParams } from "react-router-dom";

export default function ControleTorneio() {
  const { id } = useParams();

  return (
    <Row gutter={[48, 48]}>
      <Col span={8}>
        <div style={{ backgroundColor: "lightblue" }}>
          <NavLink
            to={`/admin/torneio/${id}/validacao`}
            className="menu-card"
          >
            Validação
          </NavLink>
        </div>
      </Col>

      <Col span={8}>
        <div style={{ backgroundColor: "lightblue" }}>
          <NavLink to={`/admin/torneio/${id}/controles/eliminatoria`} className="menu-card">
            Controle Eliminatória
          </NavLink>
        </div>
      </Col>
    </Row>
  );
}
