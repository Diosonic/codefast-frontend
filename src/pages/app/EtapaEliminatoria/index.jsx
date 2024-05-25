import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../services/controleEliminatoria.service";
import TempoIndividual from "../../../components/app/EtapaEliminatoria/TempoIndividual";
import "./styles.scss";

export default function EtapaEliminatoria() {
  const { id } = useParams();
  const [equipesEliminatoria, setEquipesEliminatoria] = useState([]);
  const _controleEliminatoriaService = new ControleEliminatoriaService();
  const teamScoreRef = useRef(null);

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

  useEffect(() => {
    const scrollDiv = teamScoreRef.current;
    let scrollDirection = 1;

    const scrollInterval = setInterval(() => {
      if (scrollDiv) {
        if (
          scrollDiv.scrollTop + scrollDiv.clientHeight >=
          scrollDiv.scrollHeight
        ) {
          // Chegou ao rodapé, pausa por 2 segundos e depois inverte a direção
          setTimeout(() => {
            scrollDirection = -1;
          }, 2000);
        } else if (scrollDiv.scrollTop <= 0) {
          // Chegou ao topo, pausa por 2 segundos e depois inverte a direção
          setTimeout(() => {
            scrollDirection = 1;
          }, 2000);
        }

        // Rola normalmente se não estiver no topo ou no rodapé
        scrollDiv.scrollTop += scrollDirection * 2; // Ajuste o valor para a velocidade de rolagem
      }
    }, 50); // Ajuste o intervalo para uma rolagem mais suave ou mais rápida

    return () => clearInterval(scrollInterval);
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
      <div className="team-score" ref={teamScoreRef}>
        <Row>
          {equipesEliminatoria?.map((equipe) => (
            <Col span={24} key={equipe.id}>
              <div className="score">
                <table>
                  <tbody>
                    <tr className={checkStatus(equipe.statusValidacao)}>
                      <td className="team-name">{equipe.equipe.nome}</td>
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
