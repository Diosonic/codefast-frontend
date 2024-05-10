import { Flex, Popconfirm } from "antd";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const navigate = useNavigate();

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
        const equipesAtualizadas = controleMataMata.filter(
          (equipe) => equipe.id !== controleEquipeId
        );

        setControleMataMata(equipesAtualizadas);
      })
      .catch((res) => {
        alert(res.response.data);
      });
  }

  console.log(controleMataMata);

  return (
    <div className="admin-page">
      <div>
        <h1>Operação mata-mata</h1>
      </div>

      {controleMataMata?.map((controleEquipe) => (
        <>
          {console.log(controleEquipe)}
          {controleEquipe.statusValidacao === "Em Progresso" && (
            <Popconfirm
              title="Alterar status"
              description={`Deseja alterar o status para validando"?`}
              onConfirm={() =>
                AlterarStatusValidacao(controleEquipe.id, "Validando")
              }
            >
              <div className="listagem-validacao">
                <h2>{controleEquipe.nome}</h2>
              </div>
            </Popconfirm>
          )}
        </>
      ))}

      <Flex
        gap="small"
        wrap
        style={{ paddingTop: "2rem" }}
        justify={"space-between"}
      >
        <Button
          onClick={() => navigate(`/admin/torneio/${id}/controles/mata-mata`)}
        >
          Voltar
        </Button>

        <div>
          <Flex gap="small" wrap>
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
        </div>
      </Flex>
    </div>
  );
}
