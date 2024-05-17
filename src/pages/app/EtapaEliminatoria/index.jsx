import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../services/controleEliminatoria.service";
import TempoIndividual from "../../../components/app/EtapaEliminatoria/TempoIndividual";
import "./styles.scss";

export default function EtapaEliminatoria() {
  const { id } = useParams();
  const [equipesEliminatoria, setEquipesEliminatoria] = useState([]);
  const _controleEliminatoriaService = new ControleEliminatoriaService();

  useEffect(() => {
    async function init() {
      const fetchItems = async () => {
        try {
          const responseControleEliminatoria =
            await _controleEliminatoriaService.GetAllEquipesCredenciadasEliminatoria(
              id
            );

          setEquipesEliminatoria(
            responseControleEliminatoria.controleEliminatoriaEquipes
          );
        } catch (error) {
          console.error(error);
        }
      };

      const interval = setInterval(fetchItems, 10000);

      return () => clearInterval(interval);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkStatus(status) {
    if (status === "Validando") {
      return "validation";
    } else if (status === "Aprovado") {
      return "approved";
    } else if (status === "Declinado") {
      return "declined";
    } else {
      return "in-progress";
    }
  }

  return (
    <div className="team-rating-container">
      <div className="team-score">
        <Row>
          {equipesEliminatoria?.map((equipe) => (
            <Col span={24} key={equipe.id}>
              <div className="score">
                <table>
                  <tbody>
                    <tr className={checkStatus(equipe.statusValidacao)}>
                      <td className="team-name">{equipe.equipe.nome}</td>
                      {/* <p>{equipe.statusValidacao}</p> */}
                      <td>
                        <TempoIndividual equipe={equipe} key={equipe.id} />
                      </td>
                      <td className="team-points">{equipe.pontuacao}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
