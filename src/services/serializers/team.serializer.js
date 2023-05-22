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
        users: json.users.map((item) => item.id)
      }
    );

    return team;
  }

  toJson(team) {
    debugger
    const teamToJson = {};
    Object.assign(
      teamToJson,
      team.name && { name: team.name },
      {
        checked: team.checked,
      },
      team.users && { id_users: team.users.map((item) => item.id) }
    );

    return teamToJson;
  }
}
