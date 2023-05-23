import {
  Bracket,
  RoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";

import "./styles.scss";
import { useEffect, useState } from "react";
import RoundService from "../../../services/rounds.service";

export default function TeamBrackets() {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    async function init() {
      const _roundsService = new RoundService();
      const roundsResponse = await _roundsService.list();
      setRounds(roundsResponse);
    }

    init();
  }, []);

  console.log(rounds)

  const roundss = [
    {
      title: "Round of 8",
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [{ name: "Team A" }, { name: "Team B" }],
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [{ name: "Team C" }, { name: "Team D" }],
        },

        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: "Team E" }, { name: "Team F" }],
        },
        {
          id: 4,
          date: new Date().toDateString(),
          teams: [{ name: "Team G" }, { name: "Team H" }],
        },
      ],
    },
    {
      title: "Quarterfinal",
      seeds: [
        {
          id: 7,
          date: new Date().toDateString(),
          teams: [{ name: "Team A" }, { name: "Team C" }],
        },

        {
          id: 8,
          date: new Date().toDateString(),
          teams: [{ name: "Team E" }, { name: "Team H" }],
        },
      ],
    },
    {
      title: "Final",
      seeds: [
        {
          id: 7,
          date: new Date().toDateString(),
          teams: [{ name: "Team A" }, { name: "Team C" }],
        },
      ],
    },
  ];

  const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
    // breakpoint passed to Bracket component
    // to check if mobile view is triggered or not

    // mobileBreakpoint is required to be passed down to a seed
    return (
      <Seed mobileBreakpoint={breakpoint} className="seed">
        <SeedItem className="seed-item">
          <div className="seed-team">
            <SeedTeam>{seed.teams[0]?.name || "NO TEAM "}</SeedTeam>

            <SeedTeam>{seed.teams[1]?.name || "NO TEAM "}</SeedTeam>
          </div>
        </SeedItem>
      </Seed>
    );
  };

  return (
    <Bracket
      roundTitleComponent={(title, roundIndex) => {
        return <div style={{ textAlign: "center", color: "red" }}>{title}</div>;
      }}
      rounds={rounds}
      renderSeedComponent={CustomSeed}
    />
  );
}
