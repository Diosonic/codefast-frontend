export default class RoundSerializer {
  fromJson(json) {
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

    Object.assign(roundToJson, round.title && { title: round.title });
    return roundToJson;
  }
}
