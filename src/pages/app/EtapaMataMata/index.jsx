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

const rounds = [
  {
    title: "Round one",
    seeds: [
      {
        id: 1,
        teams: [{ name: "Team A" }, { name: "Team B" }],
      },
      {
        id: 2,
        teams: [{ name: "Team C" }, { name: "Team D" }],
      },
      {
        id: 3,
        teams: [{ name: "Team C" }, { name: "Team D" }],
      },
      {
        id: 4,
        teams: [{ name: "Team C" }, { name: "Team D" }],
      },
    ],
  },
  {
    title: "Round dois",
    seeds: [
      {
        id: 1,
        teams: [{ name: "Team A" }, { name: "Team C" }],
      },
      {
        id: 2,
        teams: [{ name: "Team A" }, { name: "Team C" }],
      },
    ],
  },
  {
    title: "Round dois",
    seeds: [
      {
        id: 1,
        teams: [{ name: "Team A" }, { name: "Team C" }],
      },
    ],
  },
];

export default function EtapaMataMata() {
  const { id } = useParams();
  // const [controleMataMata, setControleMataMata] = useState([]);
  const [rodadas, setRodadas] = useState([]);

  // const _controleMataMataService = new ControleMataMataService();
  const _rodadaMataMataService = new RodadaMataMataService();

  useEffect(() => {
    async function init() {
      // const controleMataMataService = await _controleMataMataService.read(id);
      // setControleMataMata(controleMataMataService);

      const rodadaAndamento = await _rodadaMataMataService.GetRodadaEmAndamento(
        id
      );
      setRodadas(rodadaAndamento.rodadas);

      debugger;
    }

    init();
  }, [id]);

  const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
    return (
      <Seed mobileBreakpoint={breakpoint} className="seed">
        <SeedItemKnockout seed={seed} />
      </Seed>
    );
  };

  return (
    <>
      {console.log(rodadas)}
      {console.log(rounds)}

      <Bracket
        // roundTitleComponent={(title, roundIndex) => {
        //   return (
        //     <div className="round-title">
        //       <h5>{title}</h5>
        //     </div>
        //   );
        // }}
        roundTitleComponent={() => {}}
        rounds={rodadas}
        renderSeedComponent={CustomSeed}
      />
    </>
  );
}
