import { SeedItem, SeedTeam } from "react-brackets";

export default function SeedItemKnockout({ seed }) {
  console.log(seed);
  return (
    <SeedItem className="seed-item">
      <div className="seed-team">
        <SeedTeam
          className={`team-1 ${seed?.teams[0]?.unplaced ? "unplaced" : ""}`}
        >
          {seed.teams[0]?.name ? (
            <>
              <div
                className="team"
                style={{
                  color: seed?.teams[0]?.isDesclassificado ? "#c1c1c1" : null,
                }}
              >
                {seed.teams[0]?.name}
              </div>
              <div className="time">
                {seed.teams[0]?.statusValidacao === "Em progresso"
                  ? " "
                  : seed.teams[0]?.statusValidacao === "Aprovado" &&
                    seed.teams[0]?.isDesclassificado
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
                <div
                  className="team"
                  style={{
                    color: seed?.teams[1]?.isDesclassificado ? "#c1c1c1" : null,
                  }}
                >
                  {seed.teams[1]?.name}
                </div>
                <div className="time">
                  {seed.teams[1]?.statusValidacao === "Em progresso"
                    ? " "
                    : seed.teams[1]?.statusValidacao === "Aprovado" &&
                      seed.teams[1]?.isDesclassificado === true
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
