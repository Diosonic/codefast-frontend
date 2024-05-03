import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../services/controleEliminatoria.service";
import TempoIndividual from "../../../components/app/EtapaEliminatoria/TempoIndividual";

export default function EtapaEliminatoria() {
  const { id } = useParams();
  const [equipesEliminatoria, setEquipesEliminatoria] = useState([]);

  useEffect(() => {
    const _controleEliminatoriaService = new ControleEliminatoriaService();

    async function init() {
      const responseControleEliminatoria =
        await _controleEliminatoriaService.GetAllEquipesCredenciadasEliminatoria(
          id
        );

      setEquipesEliminatoria(
        responseControleEliminatoria.controleEliminatoriaEquipes
      );
    }

    init();
  }, [id]);

  return (
    <div>
      {equipesEliminatoria?.map((equipe) => (
        <div style={{ display: "flex", gap: "20px" }}>
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
