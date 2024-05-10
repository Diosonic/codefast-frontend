import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControleMataMataService from "../../../../../../../../services/controleMataMata.service";
import { Flex } from "antd";
import { Button } from "antd/es/radio";

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
    await _controleMataMataService
      .AlteraStatusValidacaoMataMata({
        id: controleEquipeId,
        statusValidacao: status,
      })
      .then(async (res) => {


        // navigate(`/admin/torneio/${id}/controles/mata-mata/validacao`)

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
    <div>
      <h1>Validação {equipeMataMata?.nome}</h1>
      <hr />

      <Flex gap="small" wrap>
        <Button
          htmlType="submit"
          type="primary"
          onClick={() => {
            AlterarStatusValidacao(idEquipe, "Aprovado");
          }}
        >
          Aprovado
        </Button>

        <Button
          htmlType="submit"
          type="primary"
          onClick={() => {
            AlterarStatusValidacao(idEquipe, "Declinado");
          }}
        >
          Declinado
        </Button>
      </Flex>
    </div>
  );
}
