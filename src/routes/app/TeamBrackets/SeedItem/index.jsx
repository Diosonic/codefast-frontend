import { SeedItem, SeedTeam } from "react-brackets";
import { useEffect, useState } from "react";
import TeamService from "../../../../services/team.service";
import { convertMinutesAndSeconds } from "../../../../utils/convertMinuteAndSeconds";

export default function SeedItemKnockout({ seed, levelInProgress }) {
  const [seconds1, setSeconds1] = useState(0);
  const [seconds2, setSeconds2] = useState(0);

  async function updateTime(values) {
    const _teamService = new TeamService();
    await _teamService.update(values);
  }

  function checkUnplaced() {
    if (seed.teams[0]?.unplaced || seed.teams[1]?.unplaced) {
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    if (levelInProgress && checkUnplaced()) {
      const timer = setInterval(async () => {
        setSeconds1((prevSegundos) => prevSegundos + 1);
      }, 1000);

      if (seed.teams[0]?.validation === "Validando") {
        clearInterval(timer);

        updateTime({ id: seed.teams[0]?.id, time: seconds1 });
      }

      if (seed.teams[0]?.validation === "Aprovado") {
        clearInterval(timer);
        updateTime({ id: seed.teams[0]?.id, time: seconds1 });

        if (seed.teams[0]?.knockout_points === 1) {
          updateTime({ id: seed.teams[1]?.id, unplaced: true });
        }
      }

      if (
        seed.teams[0]?.knockout_points === 1 ||
        seed.teams[1]?.knockout_points === 1
      ) {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    } else {
      setSeconds1(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed.teams[0]?.validation, levelInProgress]);

  useEffect(() => {
    if (levelInProgress) {
      const timer = setInterval(async () => {
        setSeconds2((prevSegundos) => prevSegundos + 1);
      }, 1000);

      if (seed.teams[1]?.validation === "Validando") {
        clearInterval(timer);
        updateTime({ id: seed.teams[1]?.id, time: seconds2 });
      }

      if (seed.teams[1]?.validation === "Aprovado") {
        clearInterval(timer);
        updateTime({ id: seed.teams[1]?.id, time: seconds2 });

        if (seed.teams[1]?.knockout_points === 1) {
          updateTime({ id: seed.teams[0]?.id, unplaced: true });
        }
      }

      if (seed.teams[1]?.validation === "Declinado") {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    } else {
      setSeconds2(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed.teams[1]?.validation, levelInProgress]);



  console.log(seed.teams[0])

  return (
    <SeedItem className="seed-item">
      <div className="seed-team">
        <SeedTeam
          className={`team-1 ${seed?.teams[0]?.unplaced ? "unplaced" : ""}`}
        >
          {seed.teams[0]?.name ? (
            <>
              {/* <div className="point">{seed.teams[0]?.knockout_points}</div> */}
              <div className="team">{seed.teams[0]?.name}</div>
              <div className="time">
                {seed.teams[0]?.validation !== "Em progresso" ? (
                  `${seed.teams[0]?.validation} - ${convertMinutesAndSeconds(
                    seed.teams[0]?.time
                  )}`
                ) : seed.teams[1]?.knockout_points === 1 ||
                  seed.teams[0]?.knockout_points === 1 ? (
                  <>00:00</>
                ) : (
                  convertMinutesAndSeconds(seconds1)
                )}
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
              <>
                {/* <div className="point">{seed.teams[1]?.knockout_points}</div> */}
                <div className="team">{seed.teams[1]?.name}</div>
                <div className="time">
                  {seed.teams[1]?.validation !== "Em progresso" ? (
                    `${seed.teams[1]?.validation} - ${convertMinutesAndSeconds(
                      seed.teams[1]?.time
                    )}`
                  ) : seed.teams[1]?.knockout_points === 1 ||
                    seed.teams[0]?.knockout_points === 1 ? (
                    <>00:00</>
                  ) : (
                    convertMinutesAndSeconds(seconds2)
                  )}
                </div>
              </>
            </>
          ) : (
            "-"
          )}
        </SeedTeam>
      </div>
    </SeedItem>
  );
}
