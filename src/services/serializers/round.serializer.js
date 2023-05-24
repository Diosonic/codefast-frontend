export default class RoundSerializer {
  fromJson(json) {
    debugger;
    const round = {};

    Object.assign(
      round,
      json.id && {
        id: json.id,
      },
      json.title && {
        title: json.title,
      },
      json.seeds && {
        seeds: json.seeds,
      }
    );

    return round;
  }

  toJson(round) {
    const roundToJson = {};

    Object.assign(
      roundToJson,
      round.name && { name: round.name },
      round.email && { email: round.email }
    );
    return roundToJson;
  }
}
