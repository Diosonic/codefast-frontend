import { SeedItem, SeedTeam } from "react-brackets";

export default function SeedItemKnockout({ seed }) {
  return (
    <SeedItem className="seed-item">
      <div className="seed-team">
        <SeedTeam
          className={`team-1 ${seed?.teams[0]?.unplaced ? "unplaced" : ""}`}
        >
          {seed.teams[0]?.name ? (
            <>
              <div className="team">{seed.teams[0]?.name}</div>
              <div className="time">
                {seed.teams[0]?.statusValidacao === "Em Progresso"
                  ? " "
                  : seed.teams[0]?.statusValidacao}
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
                <div className="team">{seed.teams[1]?.name}</div>
                <div className="time">
                  {seed.teams[1]?.statusValidacao === "Em Progresso"
                    ? " "
                    : seed.teams[1]?.statusValidacao}
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
