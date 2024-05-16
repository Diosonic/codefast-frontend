import {
  Bracket,
  RoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";
import SeedItemKnockout from "./chaves";
import "./styles.scss";
import { useEffect, useState } from "react";
import ControleMataMataService from "../../../services/controleMataMata.service";
import { useParams } from "react-router-dom";
import RodadaMataMataService from "../../../services/rodadaMataMata.service";
import { Popconfirm } from "antd";

export default function EtapaMataMata() {
  const { id } = useParams();
  const [rodadas, setRodadas] = useState([]);

  const _rodadaMataMataService = new RodadaMataMataService();
console.log(rodadas)
  useEffect(() => {
    async function init() {
      const fetchItems = async () => {
        try {
          const rodadaAndamento =
            await _rodadaMataMataService.GetRodadaEmAndamento(id);

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
    debugger;
    return (
      <Seed mobileBreakpoint={breakpoint} className="seed">
        <SeedItemKnockout seed={seed} />
      </Seed>
    );
  };

  return (
    <>
      <Bracket
        roundTitleComponent={(title, roundIndex) => {
          return (
            <div className="round-title">
              <h5>{title}</h5>
            </div>
          );
        }}
        // roundTitleComponent={() => {}}
        rounds={rodadas}
        renderSeedComponent={CustomSeed}
      />
    </>
  );
}
