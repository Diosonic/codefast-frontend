import { Button, Flex } from "antd";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControleMataMataService from "../../../../../../../services/controleMataMata.service";

import "./styles.scss";

export default function MataMataValidacao() {
  const { id } = useParams();
  const [controleMataMata, setControleMataMata] = useState([]);

  const _controleMataMataService = new ControleMataMataService();

  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      debugger;
      const controleMataMataService =
        await _controleMataMataService.GetAllEquipesCredenciadasValidando(id);

      setControleMataMata(controleMataMataService.controleMataMataEquipes);

      debugger;
    }

    init();
  }, [id]);

  return (
    <div className="admin-page">
      <div>
        <h1>Validação Mata-Mata</h1>
      </div>

      {controleMataMata?.map((equipe) => (
        <div
          className="listagem-validacao"
          onClick={() =>
            navigate(
              `/admin/torneio/${id}/controles/mata-mata/validacao/${equipe.id}`
            )
          }
        >
          <br />

          <h2>{equipe.nome}</h2>
        </div>
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

        <Button
          onClick={() => navigate(`/torneio/${id}/etapa-mata-mata`)}
          type="primary"
        >
          Ir para placar ao vivo
        </Button>
      </Flex>
    </div>
  );
}
