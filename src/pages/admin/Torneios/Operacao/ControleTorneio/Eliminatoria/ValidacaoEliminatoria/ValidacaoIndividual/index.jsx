import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../../../../../../services/controleEliminatoria.service";

export default function ValidacaoIndividual() {
  const { idEquipe } = useParams();
  const [equipeEliminatoria, setEquipeEliminatoria] = useState();

  const _controleEliminatoriaService = new ControleEliminatoriaService();

  useEffect(() => {
    async function init() {
      const responseControleEliminatoria =
        await _controleEliminatoriaService.GetControleEliminatoriaById(
          idEquipe
        );

      setEquipeEliminatoria(responseControleEliminatoria);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEquipe]);

  async function handleAlteraStatusValidacao(equipe, status) {
    if (status === "Aprovado") {
      const teamResponse =
        await _controleEliminatoriaService.GetControleEliminatoriaById(
          equipe.id
        );

      const [hours, minutes, seconds] = teamResponse.tempo
        .split(":")
        .map(Number);
      const tempoEmMinutos = hours * 60 + minutes + seconds / 60;

      let pontuacao = 100;

      if (tempoEmMinutos <= 10) {
        pontuacao = 200; // Menos de 10 minutos
      } else if (tempoEmMinutos <= 17.5) {
        pontuacao = 175; // Entre 10 minutos e 17 minutos e 30 segundos
      } else if (tempoEmMinutos <= 25) {
        pontuacao = 150; // Entre 17 minutos e 30 segundos e 25 minutos
      } else if (tempoEmMinutos <= 32.5) {
        pontuacao = 125; // Entre 25 minutos e 32 minutos e 30 segundos
      } else if (tempoEmMinutos <= 40) {
        pontuacao = 100; // Entre 32 minutos e 30 segundos e 40 minutos
      } else if (tempoEmMinutos <= 47.5) {
        pontuacao = 75; // Entre 40 minutos e 47 minutos e 30 segundos
      } else {
        pontuacao = 50; // Mais de 47 minutos e 30 segundos
      }

      await _controleEliminatoriaService.AlteraStatusValidacao({
        id: equipe.id,
        statusValidacao: status,
        pontuacao: pontuacao,
      });
    }

    if (status === "Declinado") {
      await _controleEliminatoriaService.AlteraStatusValidacao({
        id: equipe.id,
        statusValidacao: status,
      });
    }
  }

  return (
    <div>
      <h1>Validação {equipeEliminatoria?.equipe?.nome}</h1>

      <hr />

      <button
        onClick={() => {
          handleAlteraStatusValidacao(equipeEliminatoria, "Aprovado");
        }}
      >
        Aprovado
      </button>
      <button
        onClick={() => {
          handleAlteraStatusValidacao(equipeEliminatoria, "Declinado");
        }}
      >
        Declinado
      </button>
    </div>
  );
}
