import EquipeMataMataSerializer from "./EquipeMataMata.serializer";


export default class SementeRodadaSerializer {
  constructor() {
    this.equipeMataMata = new EquipeMataMataSerializer();
  }

  fromJson(json) {
    const sementeRodada = {};

    Object.assign(
      sementeRodada,
      json.id && { id: json.id },
      json.equipes && {
        teams: json.equipes.map((item) =>
          this.equipeMataMata.fromJson(item)
        ),
      }
    );

    return sementeRodada;
  }
}
