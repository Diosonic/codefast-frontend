import { Col, Row } from "reactstrap";
import "./styles.scss";

function CurrentLevel() {
  return (
    <Row>
      <Col md="8" lg="8" xl="8">
        <h3>1. Lógica de programação básica</h3>
      </Col>

      <Col md="4" lg="4" xl="4">
        Timer
      </Col>
    </Row>
  );
}

export default function InfoLevel() {
  return (
    <Row>
      <Col md="4" lg="4" xl="4">
        <div className="level-mapper">
          <h2>Welcome back, Yuri!</h2>

          <p>
            Complete the lessons each day to build your streak and get featured
          </p>
        </div>
      </Col>

      <Col md="8" lg="8" xl="8">
        <div className="current-level">
          <CurrentLevel />
        </div>
      </Col>
    </Row>
  );
}
