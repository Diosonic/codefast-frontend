import { useEffect, useState } from "react";
import ControleEliminatoriaService from "../../../../services/controleEliminatoria.service";

export default function TempoIndividual({ equipe }) {
  const [tempoAtual, setTempoAtual] = useState(equipe.tempo);
  const _controleEliminatoriaService = new ControleEliminatoriaService();

  async function alterarStatusValidacao(values) {
    await _controleEliminatoriaService.AlteraStatusValidacao(values);
  }

  useEffect(() => {
    const timer = setInterval(async () => {
      localStorage.setItem(`${equipe.equipe.nome}`, tempoAtual);

      setTempoAtual((prevTime) => incrementarTempo(prevTime));
    }, 1000);

    if (equipe.statusValidacao === "Validando") {
      clearInterval(timer);
      alterarStatusValidacao({
        id: equipe.id,
        tempo: tempoAtual,
        statusValidacao: equipe.statusValidacao,
      });
    }

    if (equipe.statusValidacao === "Aprovado") {
      clearInterval(timer);
    }

    if (equipe.statusValidacao === "Declinado") {
      clearInterval(timer);
      alterarStatusValidacao({
        id: equipe.id,
        statusValidacao: "Em progresso",
      });
    }

    if (equipe.statusValidacao === "Em espera") {
      clearInterval(timer);
      setTempoAtual("00:00:00");
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipe.statusValidacao]);

  const incrementarTempo = (tempoString) => {
    const [horas, minutos, segundos] = tempoString.split(":").map(Number);

    let novoSegundo = segundos + 1;
    let novoMinuto = minutos;
    let novaHora = horas;

    if (novoSegundo === 60) {
      novoSegundo = 0;
      novoMinuto++;
    }

    if (novoMinuto === 60) {
      novoMinuto = 0;
      novaHora++;
    }

    return `${formatarNumero(novaHora)}:${formatarNumero(
      novoMinuto
    )}:${formatarNumero(novoSegundo)}`;
  };

  const formatarNumero = (numero) => {
    return numero < 10 ? `0${numero}` : numero;
  };

  return <p>{tempoAtual}</p>;
}
