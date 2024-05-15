import { useEffect, useState } from "react";
import ControleEliminatoriaService from "../../../../services/controleEliminatoria.service";

export default function TempoIndividual({ equipe }) {
  const [tempoLocal, setTempoLocal] = useState(0);
  const _controleEliminatoriaService = new ControleEliminatoriaService();

  async function alterarStatusValidacao(values) {
    await _controleEliminatoriaService.AlteraStatusValidacao(values);
  }

  useEffect(() => {
    let interval;

    if (equipe.statusValidacao === "Validando") {
      alterarStatusValidacao({
        id: equipe.id,
        tempo: formatarTempo(tempoLocal),
        pontuacao: equipe.pontuacao,
        statusValidacao: "Validando",
      });

      clearInterval(interval);
    } else if (equipe.statusValidacao === "Aprovado") {
      clearInterval(interval);
      alterarStatusValidacao({
        id: equipe.id,
        tempo: formatarTempo(tempoLocal),
        pontuacao: equipe.pontuacao,
        statusValidacao: "Aprovado",
      });
    } else if (equipe.statusValidacao === "Declinado") {
      alterarStatusValidacao({
        id: equipe.id,
        statusValidacao: "Em progresso",
        tempo: formatarTempo(tempoLocal),
        pontuacao: equipe.pontuacao,
      });
    } else if (equipe.statusValidacao === "Em progresso") {
      interval = setInterval(() => {
        setTempoLocal((prevTempo) => prevTempo + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipe.statusValidacao]);

  // Função para formatar o tempo em "00:00:00"
  const formatarTempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    return `${horas < 10 ? "0" + horas : horas}:${
      minutos < 10 ? "0" + minutos : minutos
    }:${segundosRestantes < 10 ? "0" + segundosRestantes : segundosRestantes}`;
  };

  return <span>{formatarTempo(tempoLocal)}</span>;
}
