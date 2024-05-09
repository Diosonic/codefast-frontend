import { Col, Flex, Row } from "antd";
import { React } from "react";
import { NavLink, useParams } from "react-router-dom";
import EtapaMataMata from "../../../../../../app/EtapaMataMata";

import "./styles.scss";
import { Button } from "antd/es/radio";
import RodadaMataMataService from "../../../../../../../services/rodadaMataMata.service";

export default function OperacaoMataMata() {
  const { id } = useParams();

  const _rodadaMataMataService = new RodadaMataMataService();

  async function CriaRodadas() {
    await _rodadaMataMataService
      .CriaRodadasEtapaMataMata(id)
      .then((res) => {
        alert(res);
        window.location.reload();
      })
      .catch((res) => {
        alert(res.response.data);
      });
  }

  return (
    <div>
      <h1>Operação mata-mata</h1>
      <p>Aqui será feita as operações de controle da etapa mata-mata.</p>

      <hr />

      <Flex align="flex-start" gap="small" vertical>
        <Button
          htmlType="submit"
          type="primary"
          onClick={() => {
            CriaRodadas();
          }}
        >
          Criar rodadas
        </Button>

        <Button
          htmlType="submit"
          type="primary"
          onClick={() => {
            alert("estudando possibilidades");
          }}
        >
          Criar chaves
        </Button>
      </Flex>

      <div className="por-enquanto">
        <EtapaMataMata />
      </div>
    </div>
  );
}
