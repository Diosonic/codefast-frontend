import { Bracket, Seed } from "react-brackets";
import SeedItemKnockout from "./chaves";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RodadaMataMataService from "../../../services/rodadaMataMata.service";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import TorneioService from "../../../services/torneio.service";

export default function EtapaMataMata() {
  const { id } = useParams();
  const [rodadas, setRodadas] = useState([]);
  const [tempoCorrendoFlag, setTempoCorrendoFlag] = useState(false);
  const [novaRodadaFlag, setNovaRodadaFlag] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [key, setKey] = useState(0);

  const _rodadaMataMataService = new RodadaMataMataService();
  const _torneioService = new TorneioService();

  const convertTimestampToSeconds = (timestamp) => {
    debugger;
    const [hours, minutes, seconds] = timestamp.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  useEffect(() => {
    async function init() {
      const fetchItems = async () => {
        try {
          debugger;
          const rodadaAndamento =
            await _rodadaMataMataService.GetRodadaEmAndamento(id);

          const torneioResponse = await _torneioService.read(id);

          setTempoCorrendoFlag(torneioResponse?.isTempoCorrendo);
          setNovaRodadaFlag(torneioResponse?.isNovaRodada);

          const tempoConvertido = convertTimestampToSeconds(
            torneioResponse.tempo
          );
          setTempo(tempoConvertido);

          setRodadas(rodadaAndamento.rodadas);
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

  const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
    return (
      <Seed mobileBreakpoint={breakpoint} className="seed">
        <SeedItemKnockout seed={seed} />
      </Seed>
    );
  };

  const children = ({ remainingTime }) => {
    if (novaRodadaFlag) {
      setKey((prevKey) => prevKey + 1);
    }

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return (
      <span className="timer-span">
        {formattedMinutes}:{formattedSeconds}
      </span>
    );
  };

  return (
    <div className="mata-mata-container" style={{ paddingTop: "2rem" }}>
      <Bracket
        roundTitleComponent={(title, roundIndex) => {
          return (
            <div className="round-title">
              <h5>{title}</h5>
            </div>
          );
        }}
        rounds={rodadas}
        renderSeedComponent={CustomSeed}
      />

      <div className="timer">
        <CountdownCircleTimer
          key={key} // Usando a chave para forçar a remontagem do componente quando é atualizada
          isPlaying={tempoCorrendoFlag}
          duration={tempo}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
        >
          {children}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}
