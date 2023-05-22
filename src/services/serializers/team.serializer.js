import UserSerializer from "./user.serializer";

export default class TeamSerializer {
  constructor() {
    this._userSerializer = new UserSerializer();
  }

  fromJson(json) {
    const team = {};

    Object.assign(
      team,
      json.name && { name: json.name },
      {
        checked: json.checked,
      },
      json.id && { id: json.id, value: json.id, label: json.name },
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
      }
    );

    return team;
  }

  toJson(team) {
    debugger
    const teamToJson = {};
    debugger;

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
      }
    );

    return teamToJson;
  }
}
