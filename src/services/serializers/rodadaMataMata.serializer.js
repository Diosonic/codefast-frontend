import SementeRodadaSerializer from "./sementeRodada.serializer";


export default class RodadaMataMataSerializer {
  constructor() {
    this.sementeRodada = new SementeRodadaSerializer();
  }


  fromJson(json) {
    const rodadaMataMata = {};

    Object.assign(
      rodadaMataMata,
      json.titulo && {title: json.titulo},
      json.sementeRodadas && {
        seeds: json.sementeRodadas.map((item) =>
          this.sementeRodada.fromJson(item)
        )
      },


    );

    return rodadaMataMata;
  }
}
