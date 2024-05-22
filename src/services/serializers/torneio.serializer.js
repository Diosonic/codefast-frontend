import EquipeSerializer from "./equipe.serializer";

export default class TorneioSerializer {
  constructor() {
    this.equipeSerializer = new EquipeSerializer();
  }

  fromJson(json) {
    const torneio = {};

    Object.assign(
      torneio,
      json.id && { id: json.id },
      json.titulo && { titulo: json.titulo },
      json.tempo && { tempo: json.tempo },
      { isTempoCorrendo: json.isTempoCorrendo },
      json.equipes && {
        equipes: json.equipes.map((item) =>
          this.equipeSerializer.fromJson(item)
        ),
      }
    );

    return torneio;
  }
}
