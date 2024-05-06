import { useEffect, useState } from "react";
import ControleEliminatoriaService from "../../../../services/controleEliminatoria.service";

export default function TempoIndividual({ equipe }) {
  const [tempoAtual, setTempoAtual] = useState(equipe.tempo);
  const _controleEliminatoriaService = new ControleEliminatoriaService();

  function parseTimeStringToTimeSpan(timeString) {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Create a new Date object with the time values
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    // Extract hours, minutes, and seconds from the Date object
    const hoursOfDay = date.getHours();
    const minutesOfDay = date.getMinutes();
    const secondsOfDay = date.getSeconds();

    // Create a TimeSpan object
    return {
      hours: hoursOfDay,
      minutes: minutesOfDay,
      seconds: secondsOfDay,
    };
  }

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
      // updateTime({ id: item.id, time: segundos });
    }

    if (equipe.statusValidacao === "Declinado") {
      clearInterval(timer);
      // updateTime({ id: item.id, time: segundos });
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
