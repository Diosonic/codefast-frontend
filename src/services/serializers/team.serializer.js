import UserSerializer from "./user.serializer";

export default class TeamSerializer {
  constructor() {
    this._userSerializer = new UserSerializer();
  }

  fromJson(json) {
    debugger;
    const team = {};
    Object.assign(
      team,
      json.id && { id: json.id, value: json.id, label: json.name },
      json.name && { name: json.name },
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
      json.time && {
        time: json.time,
      }
    );

    return team;
  }

  toJson(team) {
    debugger;
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
      }
    );

    return teamToJson;
  }
}
