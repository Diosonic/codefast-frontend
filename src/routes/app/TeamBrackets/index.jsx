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
import RoundService from "../../../services/round.service";
import ClassificationScoreService from "../../../services/classification-score.service";

export default function TeamBrackets() {
  const [rounds, setRounds] = useState([]);

  const _roundsService = new RoundService();

  useEffect(() => {
    setInterval(async () => {
      const roundsResponse = await _roundsService.list();
      setRounds(roundsResponse);

  
    }, 5000);
  }, []);

  console.log(rounds);



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

  console.log(rounds);





  const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
    return (
      <Seed mobileBreakpoint={breakpoint} className="seed">
        <SeedItem className="seed-item">
          <div className="seed-team">
            <SeedTeam
              className={`team-1 ${seed?.teams[0]?.unplaced ? "unplaced" : ""}`}
            >
              {seed.teams[0]?.name ? (
                <>
                  <div className="point">1</div>
                  <div className="team">{seed.teams[0]?.name}</div>
                  <div className="time">
                    {seed.teams[0]?.validation !== "Em progresso"
                      ? seed.teams[0]?.validation
                      : seed.teams[0]?.time}
                  </div>
                </>
              ) : (
                "-"
              )}
            </SeedTeam>

            <SeedTeam
              className={`team-2 ${seed?.teams[1]?.unplaced ? "unplaced" : ""}`}
            >
              {seed.teams[1]?.name ? (
                <>
                  <div className="point">2</div>
                  <div className="team">{seed.teams[1]?.name}</div>
                  <div className="time">67</div>
                </>
              ) : (
                "-"
              )}
            </SeedTeam>
          </div>
        </SeedItem>
      </Seed>
    );
  };

  return (
    <Bracket
      roundTitleComponent={(title, roundIndex) => {
        return (
          <div className="round-title">
            <h5>{title}</h5>
          </div>
        );
      }}
      rounds={rounds}
      renderSeedComponent={CustomSeed}
    />
  );
}
