import { useEffect, useState, React } from "react";
import { NavLink, useParams } from "react-router-dom";
import TorneioService from "../../../../services/torneio.service";
import { Col, Row } from "antd";

export default function Operacao() {
  const { id } = useParams();
  const [torneio, setTorneio] = useState();

  useEffect(() => {
    const _torneioService = new TorneioService();

    async function init() {
      const torneioResponse = await _torneioService.read(id);
      setTorneio(torneioResponse);
    }

    init();
  }, [id]);

  return (
    <Row gutter={[48, 48]}>
      <Col span={8}>
        <div style={{ backgroundColor: "lightcoral" }}>
          <NavLink
            to={`/admin/torneio/${id}/credenciamento`}
            className="menu-card"
          >
            Credenciamento
          </NavLink>
        </div>
      </Col>

      <Col span={8}>
      <div style={{ backgroundColor: "lightcoral" }}>
          <NavLink
            to={`/admin/torneio/${id}/controles`}
            className="menu-card"
          >
            Operação
          </NavLink>
        </div>
      </Col>
    </Row>
  );
}
