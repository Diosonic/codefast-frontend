export default class EquipeSerializer {
  fromJson(json) {
    const equipe = {};

    Object.assign(
      equipe,
      json.id && { id: json.id },
      json.nome && { nome: json.nome },
      json.nomeParticipantes && { nomeParticipantes: json.nomeParticipantes },
      { isCredenciado: json.isCredenciado }
    );

    return equipe;
  }

  toJson(equipe) {
    const equipeToJson = {};

    Object.assign(
      equipeToJson,
      equipe.id && { id: equipe.id },
      equipe.nome && { nome: equipe.nome },
      equipe.nomeParticipantes && {
        nomeParticipantes: equipe.nomeParticipantes,
      },
      { isCredenciado: equipe.isCredenciado },
      equipe.torneioId && { torneioId: equipe.torneioId }
    );

    return equipeToJson;
  }
}
