import { NavLink } from "react-router-dom";
import "./styles.scss";
import { Col, Row } from "reactstrap";
import { People, Personalcard, PlayCircle, Rank } from "iconsax-react";

export default function AdminPage() {
  return (
    <div className="admin-page">
      <Row className="justify-content-center">
        <Col md="2" lg="2" xl="2">
          <NavLink to="/admin/teams" className="menu-card">
            <Personalcard size="42" color="#555555" />
            <label>Equipes</label>
          </NavLink>
        </Col>

        <Col md="2" lg="2" xl="2">
          <NavLink to="/admin/users" className="menu-card">
            <People size="42" color="#555555" />
            <label>Usuários</label>
          </NavLink>
        </Col>

        <Col md="2" lg="2" xl="2">
          <NavLink to="/admin/validation" className="menu-card">
            <Rank size="42" color="#555555" />
            <label>Validação e Classificatória</label>
          </NavLink>
        </Col>

        <Col md="2" lg="2" xl="2">
          <NavLink to="/admin/brackets" className="menu-card">
            <PlayCircle size="42" color="#555555" />
            <label>Eliminatória</label>
          </NavLink>
        </Col>
      </Row>
    </div>
  );
}
