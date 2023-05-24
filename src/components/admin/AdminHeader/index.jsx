import { NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";

import "./styles.scss";
import { Button } from "antd";

export default function AdminHeader({ title, buttonRoute }) {
  return (
    <>
      <Row>
        <Col md="6" lg="6" xl="6">
          <h1 className="title-admin-header">{title}</h1>
        </Col>

        <Col md="6" lg="6" xl="6" className="inputs-col">
          {buttonRoute && (
            <NavLink to={buttonRoute}>
              <Button type="primary">Adicionar novo</Button>
            </NavLink>
          )}
        </Col>
      </Row>

      <hr className="hr-admin-header" />
    </>
  );
}
