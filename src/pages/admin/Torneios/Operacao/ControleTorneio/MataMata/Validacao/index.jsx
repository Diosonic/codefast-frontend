import { Col, Row } from "antd";
import { React, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ControleMataMataService from "../../../../../../../services/controleMataMata.service";

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
    <div>
      <h1>Validação mata-mata</h1>
      <p>Aqui será feita as validações da etapa mata-mata.</p>
      <hr />

      {controleMataMata?.map((equipe) => (
        <div
          style={{ display: "flex", gap: "20px" }}
          onClick={() =>
            navigate(`/admin/torneio/${id}/controles/mata-mata/validacao/${equipe.id}`)
          }
        >
          <br />
          <h1>{equipe.nome}</h1>

        </div>
      ))}
    </div>
  );
}
