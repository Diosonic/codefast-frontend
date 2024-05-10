import { Col, Row } from "antd";
import { React } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BackSquare, Data, Rank } from "iconsax-react";

export default function ControleTorneio() {
  const { id } = useParams();

  return (
    <div className="admin-page">
      <div style={{ paddingBottom: "3rem" }}>
        <h1>Etapas</h1>
      </div>

      <Row gutter={[48, 48]}>
        <Col span={8}>
          <NavLink
            to={`/admin/torneio/${id}/controles/eliminatoria`}
            className="menu-card"
          >
            <Rank size="42" color="#555555" />
            <label>Eliminatória</label>
          </NavLink>
        </Col>

        <Col span={8}>
          <NavLink
            to={`/admin/torneio/${id}/controles/mata-mata`}
            className="menu-card"
          >
            <Data size="42" color="#555555" />
            <label>Mata-Mata</label>
          </NavLink>
        </Col>

        <Col span={8}>
          <NavLink to={`/admin/torneio/${id}`} className="menu-card">
            <BackSquare size="42" color="#f47373" />
            <label>Voltar</label>
          </NavLink>
        </Col>
      </Row>
    </div>
  );
}
