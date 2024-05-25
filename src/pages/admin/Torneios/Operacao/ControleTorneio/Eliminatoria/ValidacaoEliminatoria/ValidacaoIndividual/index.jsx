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
    const teamResponse =
      await _controleEliminatoriaService.GetControleEliminatoriaById(equipe.id);

    if (status === "Aprovado") {
      const [hours, minutes, seconds] = teamResponse.tempo
        .split(":")
        .map(Number);
      const tempoEmMinutos = hours * 60 + minutes + seconds / 60;

      let pontuacao;

      if (tempoEmMinutos <= 5) {
        pontuacao = teamResponse.pontuacao + 200; // Até 5 minutos
      } else if (tempoEmMinutos <= 10) {
        pontuacao = teamResponse.pontuacao + 175; // Entre 6 e 10 minutos
      } else if (tempoEmMinutos <= 15) {
        pontuacao = teamResponse.pontuacao + 150; // Entre 11 e 15 minutos
      } else if (tempoEmMinutos <= 20) {
        pontuacao = teamResponse.pontuacao + 125; // Entre 16 e 20 minutos
      } else if (tempoEmMinutos <= 25) {
        pontuacao = teamResponse.pontuacao + 100; // Entre 21 e 25 minutos
      } else {
        pontuacao = teamResponse.pontuacao + 50; // Acima de 25 minutos
      }

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
      debugger;
      await _controleEliminatoriaService
        .AlteraStatusValidacao({
          id: equipe.id,
          statusValidacao: status,
          pontuacao: teamResponse.pontuacao + 20,
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
