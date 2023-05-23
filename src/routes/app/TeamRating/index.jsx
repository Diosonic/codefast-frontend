import "./styles.scss";
import InfoLevel from "./InfoLevel";
import { useEffect, useState } from "react";
import TeamService from "../../../services/team.service";
import TemporizadorItem from "../../../components/TemporizadorItem";
import { Col, Row } from "reactstrap";
import "./styles.scss";




export default function TeamRating() {
  const [teamsList, setTeamsList] = useState([]);
  const [levelInProgress, setLevelInProgress] = useState();
  const _teamService = new TeamService();

  useEffect(() => {
    setInterval(async () => {
      const responseTeamService = await _teamService.list();
      setTeamsList(responseTeamService);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function init() {
      const responseTeamService = await _teamService.list();
      debugger;
      setTeamsList(responseTeamService);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="team-rating-container">
      {/* <InfoLevel /> */}

      <button
        onClick={() => {
          setLevelInProgress(true);
        }}
      >
        Começar etapa
      </button>

      <div className="team-score">
        <Row>
          {teamsList.map((item) => (
            <TemporizadorItem
              key={item.id}
              item={item}
              levelInProgress={levelInProgress}
            />
          ))}
        </Row>
      </div>
    </div>
  );
}
