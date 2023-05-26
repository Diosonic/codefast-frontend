import "./styles.scss";
import { useEffect, useState } from "react";
import TeamService from "../../../services/team.service";
import TemporizadorItem from "../../../components/TemporizadorItem";
import { Col, Row } from "reactstrap";
import "./styles.scss";
import ClassificationScoreService from "../../../services/classification-score.service";

export default function TeamRating() {
  const [teamsList, setTeamsList] = useState([]);
  const _teamService = new TeamService();
  const [levelInProgress, setLevelInProgress] = useState();

  useEffect(() => {
    setInterval(async () => {
      const responseTeamService = await _teamService.list();
      setTeamsList(responseTeamService);

      const _classificationScoreService = new ClassificationScoreService();
      const levelState = await _classificationScoreService.getProgress();

      if (levelState.inProgress) {
        setLevelInProgress(true);
      } else {
        setLevelInProgress(false);
      }
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelInProgress]);

  useEffect(() => {
    async function init() {
      const responseTeamService = await _teamService.list();
      setTeamsList(responseTeamService);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="team-rating-container">
      <div className="team-score">
        <Row>
          {teamsList.map((item) => (
            <Col lg="12" sm="12" md="12">
              {item.checked && !item.unplaced && (
                <TemporizadorItem
                  key={item.id}
                  item={item}
                  levelInProgress={levelInProgress}
                />
              )}
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
