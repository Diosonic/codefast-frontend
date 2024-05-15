import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../../../../../../services/controleEliminatoria.service";
import { Flex } from "antd";

export default function ValidacaoIndividual() {
  const { id, idEquipe } = useParams();
  const [equipeEliminatoria, setEquipeEliminatoria] = useState();

  const _controleEliminatoriaService = new ControleEliminatoriaService();
  const navigate = useNavigate();

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
        pontuacao = teamResponse.pontuacao + 200; // Menos de 10 minutos
      } else if (tempoEmMinutos <= 17.5) {
        pontuacao = teamResponse.pontuacao + 175; // Entre 10 minutos e 17 minutos e 30 segundos
      } else if (tempoEmMinutos <= 25) {
        pontuacao = teamResponse.pontuacao + 150; // Entre 17 minutos e 30 segundos e 25 minutos
      } else if (tempoEmMinutos <= 32.5) {
        pontuacao = teamResponse.pontuacao + 125; // Entre 25 minutos e 32 minutos e 30 segundos
      } else if (tempoEmMinutos <= 40) {
        pontuacao = teamResponse.pontuacao + 100; // Entre 32 minutos e 30 segundos e 40 minutos
      } else if (tempoEmMinutos <= 47.5) {
        pontuacao = teamResponse.pontuacao + 75; // Entre 40 minutos e 47 minutos e 30 segundos
      } else {
        pontuacao = teamResponse.pontuacao + 50; // Mais de 47 minutos e 30 segundos
      }

      debugger;
      await _controleEliminatoriaService
        .AlteraStatusValidacao({
          id: equipe.id,
          statusValidacao: status,
          pontuacao: pontuacao,
          tempo: equipe.tempo,
        })
        .then((res) => {
          navigate(`/admin/torneio/${id}/controles/eliminatoria/validacao`);
        });
    }

    if (status === "Declinado") {
      await _controleEliminatoriaService
        .AlteraStatusValidacao({
          id: equipe.id,
          statusValidacao: status,
        })
        .then((res) => {
          navigate(`/admin/torneio/${id}/controles/eliminatoria/validacao`);
        });
    }
  }

  return (
    <div className="admin-page">
      <div style={{ paddingBottom: "2rem" }}>
        <h1>Validação - {equipeEliminatoria?.equipe?.nome}</h1>
      </div>

      <Flex gap="small" wrap>
        <button
          htmlType="submit"
          className="aprovar-button"
          type="primary"
          onClick={() => {
            handleAlteraStatusValidacao(equipeEliminatoria, "Aprovado");
          }}
        >
          Aprovar
        </button>

        <button
          htmlType="submit"
          className="declinar-button"
          type="primary"
          onClick={() => {
            handleAlteraStatusValidacao(equipeEliminatoria, "Declinado");
          }}
        >
          Declinar
        </button>
      </Flex>
    </div>
  );
}
