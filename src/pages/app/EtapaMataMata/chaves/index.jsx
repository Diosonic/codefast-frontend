import { SeedItem, SeedTeam } from "react-brackets";

export default function SeedItemKnockout({ seed }) {
  let backgroundColorFirstTeam = null;
  let backgroundColorSecondTeam = null;

  function procurarPartidaFinalizada(teams) {
    return teams.some((team) => team.isDesclassificado === true);
  }

  const sementeFinalizada = procurarPartidaFinalizada(seed?.teams);

  backgroundColorFirstTeam =
    procurarPartidaFinalizada(seed?.teams) && "#fafafa";
  backgroundColorSecondTeam =
    procurarPartidaFinalizada(seed?.teams) && "#fafafa";

  if (!sementeFinalizada) {
    if (seed?.teams[0]?.statusValidacao === "Validando") {
      backgroundColorSecondTeam = "14px solid #e7cd38";
    } else if (seed?.teams[0]?.statusValidacao === "Aprovado") {
      backgroundColorSecondTeam = "14px solid #2dc04d";
    } else if (seed?.teams[0]?.statusValidacao === "Declinado") {
      backgroundColorSecondTeam = "14px solid #ec4040";
    } else {
      backgroundColorSecondTeam = "14px solid #fff";
    }

    if (seed?.teams[1]?.statusValidacao === "Validando") {
      backgroundColorFirstTeam = "14px solid #e7cd38";
    } else if (seed?.teams[1]?.statusValidacao === "Aprovado") {
      backgroundColorFirstTeam = "14px solid #2dc04d";
    } else if (seed?.teams[1]?.statusValidacao === "Declinado") {
      backgroundColorFirstTeam = "14px solid #ec4040";
    } else {
      backgroundColorFirstTeam = "14px solid #fafafa";
    }
  }

  return (
    <SeedItem className="seed-item">
      <div className="seed-team">
        <SeedTeam
          className={`team-1 ${seed?.teams[0]?.unplaced ? "unplaced" : ""}`}
          style={{ borderLeft: backgroundColorSecondTeam }}
        >
          {seed.teams[0]?.name ? (
            <div
              className="team"
              style={{
                color: seed?.teams[0]?.isDesclassificado ? "#c1c1c1" : null,
              }}
            >
              {seed.teams[0]?.name}
            </div>
          ) : (
            "-"
          )}
        </SeedTeam>

        <SeedTeam
          className={`team-2 ${seed?.teams[1]?.unplaced ? "unplaced" : ""}`}
          style={{ borderLeft: backgroundColorFirstTeam }}
        >
          {seed.teams[1]?.name ? (
            <>
              <div
                className="team"
                style={{
                  color: seed?.teams[1]?.isDesclassificado ? "#c1c1c1" : null,
                }}
              >
                {seed.teams[1]?.name}
              </div>
            </>
          ) : (
            "-"
          )}
        </SeedTeam>
      </div>
    </SeedItem>
  );
}
