import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControleMataMataService from "../../../../../../../../services/controleMataMata.service";
import { Flex } from "antd";

import "./styles.scss";

export default function MataMataValidacaoIndividual() {
  const { id, idEquipe } = useParams();
  const [equipeMataMata, setEquipeMataMata] = useState();

  const _controleMataMataService = new ControleMataMataService();
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const responseControleMataMata =
        await _controleMataMataService.GetEquipesClassificadasMataMataById(
          idEquipe
        );

      setEquipeMataMata(responseControleMataMata);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEquipe]);

  async function AlterarStatusValidacao(controleEquipeId, status) {
    debugger;
    await _controleMataMataService
      .AlteraStatusValidacaoMataMata({
        id: controleEquipeId,
        statusValidacao: status,
      })
      .then(async (res) => {
        navigate(`/admin/torneio/${id}/controles/mata-mata/validacao`);
      })
      .catch((res) => {
        console.log(res);
        alert(res.response.data);
      });

    if (status === "Declinado") {
      setTimeout(async () => {
        await _controleMataMataService.AlteraStatusValidacaoMataMata({
          id: controleEquipeId,
          statusValidacao: "Em Progresso",
        });
      }, 10000);
    }
  }

  return (
    <div className="admin-page">
      <div style={{ paddingBottom: "2rem" }}>
        <h1>Validação - {equipeMataMata?.nome}</h1>
      </div>

      <Flex gap="small" wrap>
        <button
          htmlType="submit"
          className="aprovar-button"
          type="primary"
          onClick={() => {
            AlterarStatusValidacao(idEquipe, "Aprovado");
          }}
        >
          Aprovar
        </button>

        <button
          htmlType="submit"
          className="declinar-button"
          type="primary"
          onClick={() => {
            AlterarStatusValidacao(idEquipe, "Declinado");
          }}
        >
          Declinar
        </button>
      </Flex>
    </div>
  );
}
