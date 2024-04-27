import UserSerializer from "./user.serializer";

export default class TeamSerializer {
  constructor() {
    this._userSerializer = new UserSerializer();
  }

  fromJson(json) {
    const team = {};

    Object.assign(
      team,
      json.id && { id: json.id, value: json.id, label: json.name },
      json.name && { name: json.name },
      json.seed_id && {
        seed_id: json.seed_id,
      },
      {
        checked: json.checked,
      },
      json.users && {
        users: json.users.map((item) => this._userSerializer.fromJson(item)),
      },
      {
        validation: json.validation,
      },
      {
        unplaced: json.unplaced,
      },
      {
        points: json.points,
      },
      {
        time: json.time,
      },
      {
        knockoutPoints: json.knockout_points,
      }
    );

    return team;
  }

  toJson(team) {
    const teamToJson = {};

    Object.assign(
      teamToJson,
      team.name && { name: team.name },
      {
        checked: team.checked,
      },
      team.users && { id_users: team.users.map((item) => item.id) },
      {
        validation: team.validation,
      },
      team.points && {
        points: team.points,
      },
      {
        time: team.time,
      },
      team.seed_id && {
        seed_id: team.seed_id.id,
      },
      { unplaced: team.unplaced },

      team.hasOwnProperty("knockoutPoints") && {
        knockout_points: team.knockoutPoints,
      }
    );

    return teamToJson;
  }
}
