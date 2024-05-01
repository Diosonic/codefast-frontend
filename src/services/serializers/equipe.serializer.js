export default class EquipeSerializer {
  fromJson(json) {
    debugger;
    const equipe = {};

    Object.assign(
      equipe,
      json.id && { id: json.id },
      json.nome && { nome: json.nome },
      json.nomeParticipantes && { nomeParticipantes: json.nomeParticipantes }
    );

    return equipe;
  }

  toJson(equipe) {
    const equipeToJson = {};
    debugger;

    Object.assign(equipeToJson, equipe.id && { id: equipe.id });

    return equipeToJson;
  }
}
