
export default class TorneioSerializer {

  fromJson(json) {
    debugger;
    const torneio = {};

    Object.assign(
      torneio,
      json.id && { id: json.id },
      json.titulo && { titulo: json.titulo}
      
    );

    return torneio;
  }

  toJson(torneio) {
    const torneioToJson = {};

    Object.assign(
      torneioToJson,
      
    );

    return torneioToJson;
  }
}
