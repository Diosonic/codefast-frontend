export default class TeamSerializer {
  fromJson(json) {
    const team = {};

    return team;
  }

  toJson(team) {
    const teamToJson = {};
    debugger;

    Object.assign(teamToJson, team.name && { name: team.name }, {
      checked: team.checked,
    });
    return teamToJson;
  }
}
