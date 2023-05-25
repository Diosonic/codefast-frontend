export default class SeedSerializer {
  fromJson(json) {
    const seed = {};

    Object.assign(
      seed,
      json.id && {
        id: json.id,
        value: json.id,
        label: json.id,
      },
      json.round_id && {
        round_id: json.round_id,
      },
      json.teams && {
        teams: json.teams,
      },
      json.date_match && {
        date_match: json.date_match,
      }
    );

    return seed;
  }

  toJson(seed) {
    const seedToJson = {};

    Object.assign(
      seedToJson,
      seed.round_id && { round_id: seed.round_id },
      seed.teamId && { team_id: seed.teamId },
      seed.seedId && { seed_id: seed.seedId }
    );

    return seedToJson;
  }
}
