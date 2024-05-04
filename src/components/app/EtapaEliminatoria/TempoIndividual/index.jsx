import { useEffect, useState } from "react";

export default function TempoIndividual({ equipe }) {
  const [tempoAtual, setTempoAtual] = useState(equipe.tempo);

  useEffect(() => {
    if (equipe.statusValidacao === "Em progresso") {
      const timer = setInterval(() => {
        localStorage.setItem(`${equipe.equipe.nome}`, tempoAtual);

        setTempoAtual((prevTime) => incrementarTempo(prevTime));
      }, 1000);

      return () => clearInterval(timer);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
