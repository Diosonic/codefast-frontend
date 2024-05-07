import { SeedItem, SeedTeam } from "react-brackets";

export default function SeedItemKnockout({ seed, levelInProgress }) {
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
                Status: Em progresso
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
