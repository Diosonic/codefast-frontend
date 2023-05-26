import { Bracket, Seed } from "react-brackets";
import { useEffect, useState } from "react";
import RoundService from "../../../services/round.service";
import ClassificationScoreService from "../../../services/classification-score.service";
import SeedItemKnockout from "./SeedItem";
import "./styles.scss";

export default function TeamBrackets() {
  const [rounds, setRounds] = useState([]);
  const [levelInProgress, setLevelInProgress] = useState();

  const _roundsService = new RoundService();

  useEffect(() => {
    setInterval(async () => {
      const roundsResponse = await _roundsService.list();
      setRounds(roundsResponse);

      const _classificationScoreService = new ClassificationScoreService();
      const levelState = await _classificationScoreService.getProgress();

      if (levelState.inProgress) {
        setLevelInProgress(true);
      } else {
        setLevelInProgress(false);
      }
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
    return (
      <Seed mobileBreakpoint={breakpoint} className="seed">
        <SeedItemKnockout seed={seed} levelInProgress={levelInProgress} />
      </Seed>
    );
  };

  return (
    <Bracket
      // roundTitleComponent={(title, roundIndex) => {
      //   return (
      //     <div className="round-title">
      //       <h5>{title}</h5>
      //     </div>
      //   );
      // }}
      roundTitleComponent={() => {}}
      rounds={rounds}
      renderSeedComponent={CustomSeed}
    />
  );
}
