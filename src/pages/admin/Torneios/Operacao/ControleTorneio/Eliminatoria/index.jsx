import { Col, Row } from "antd";
import { React } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BackSquare, Briefcase, Personalcard } from "iconsax-react";

export default function ControleEliminatoria() {
  const { id } = useParams();

  return (
    <div className="admin-page">
      <div style={{ paddingBottom: "3rem" }}>
        <h1>Etapa Eliminatória</h1>
      </div>

      <Row gutter={[48, 48]}>
        <Col span={8}>
          <NavLink
            to={`/admin/torneio/${id}/controles/eliminatoria/validacao`}
            className="menu-card"
          >
            <Briefcase size="42" color="#555555" />
            <label>Vou executar validações</label>
          </NavLink>
        </Col>

        <Col span={8}>
          <NavLink
            to={`/admin/torneio/${id}/controles/eliminatoria/operacao`}
            className="menu-card"
          >
            <Personalcard size="42" color="#555555" />
            <label>Vou operar em sala de aula</label>
          </NavLink>
        </Col>

        <Col span={8}>
          <NavLink to={`/admin/torneio/${id}/controles`} className="menu-card">
            <BackSquare size="42" color="#f47373" />
            <label>Voltar</label>
          </NavLink>
        </Col>
      </Row>
    </div>
  );
}
