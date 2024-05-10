import { useEffect, useState, React } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import TorneioService from "../../../../services/torneio.service";
import { Button, Col, Flex, Row } from "antd";
import {
  Briefcase,
  Login,
  Logout,
  People,
  Personalcard,
  PlayCircle,
  Rank,
} from "iconsax-react";

export default function Operacao() {
  const { id } = useParams();
  const [torneio, setTorneio] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const _torneioService = new TorneioService();

    async function init() {
      const torneioResponse = await _torneioService.read(id);
      setTorneio(torneioResponse);
    }

    init();
  }, [id]);

  return (
    <div className="admin-page">
      <div style={{ paddingBottom: "3rem" }}>
        <h1>Controles</h1>
      </div>

      <Row gutter={[48, 48]}>
        <Col span={8}>
          <NavLink
            to={`/admin/torneio/${id}/credenciamento`}
            className="menu-card"
          >
            <Personalcard size="42" color="#555555" />
            <label>Credenciamento</label>
          </NavLink>
        </Col>

        <Col span={8}>
          <NavLink to={`/admin/torneio/${id}/controles`} className="menu-card">
            <Briefcase size="42" color="#555555" />
            <label>Operação</label>
          </NavLink>
        </Col>

        <Col span={8}>
          <NavLink to={`/admin`} className="menu-card">
            <Logout size="42" color="#f47373" />
            <label>Sair</label>
          </NavLink>
        </Col>
      </Row>
    </div>
  );
}
