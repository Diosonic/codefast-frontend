import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../services/controleEliminatoria.service";
import TempoIndividual from "../../../components/app/EtapaEliminatoria/TempoIndividual";

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

  return (
    <div>
      {equipesEliminatoria?.map((equipe) => (
        <div style={{ display: "flex", gap: "20px" }} key={equipe.id}>
          <br />

          <h1>{equipe.equipe.nome}</h1>
          <p>{equipe.statusValidacao}</p>
          <p>
            <TempoIndividual equipe={equipe} />
          </p>
          <p>{equipe.pontuacao}</p>
        </div>
      ))}
    </div>
  );
}
