import SementeRodadaSerializer from "./sementeRodada.serializer";

export default class RodadaSerializer {
  constructor() {
    this.sementeRodada = new SementeRodadaSerializer();
  }

  fromJson(json) {
    const rodada = {};

    Object.assign(
      rodada,
      json.titulo && { title: json.titulo },
      json.sementeRodadas && {
        seeds: json.sementeRodadas.map((item) =>
          this.sementeRodada.fromJson(item)
        ),
      }
    );

    return rodada;
  }

  toJson(controle) {
    const controleToJson = {};

    Object.assign(controleToJson);

    return controleToJson;
  }
}
