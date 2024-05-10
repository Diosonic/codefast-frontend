import { Flex, Popconfirm } from "antd";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EtapaMataMata from "../../../../../../app/EtapaMataMata";

import "./styles.scss";
import { Button } from "antd/es/radio";
import RodadaMataMataService from "../../../../../../../services/rodadaMataMata.service";
import ControleMataMataService from "../../../../../../../services/controleMataMata.service";

export default function OperacaoMataMata() {
  const { id } = useParams();
  const [controleMataMata, setControleMataMata] = useState([]);

  const _rodadaMataMataService = new RodadaMataMataService();
  const _controleMataMataService = new ControleMataMataService();

  useEffect(() => {
    async function init() {
      debugger;
      const controleMataMataService =
        await _controleMataMataService.GetEquipesClassificadasMataMata(id);

      setControleMataMata(controleMataMataService.controleMataMataEquipes);

      debugger;
    }

    init();
  }, [id]);

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

  async function AlterarStatusValidacao(controleEquipeId, status) {
    await _controleMataMataService
      .AlteraStatusValidacaoMataMata({
        id: controleEquipeId,
        statusValidacao: status,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((res) => {
        console.log(res);
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

      {controleMataMata?.map((controleEquipe) => (
        <Popconfirm
          title="Alterar status"
          description={`Deseja alterar o status para validando"?`}
          onConfirm={() =>
            AlterarStatusValidacao(controleEquipe.id, "Validando")
          }
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <br />

            <h1>{controleEquipe.nome}</h1>
            <p>{controleEquipe.statusValidacao}</p>
          </div>
        </Popconfirm>
      ))}
    </div>
  );
}
