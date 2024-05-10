import RodadaSerializer from "./rodada.serializer";

export default class RodadaMataMataSerializer {
  constructor() {
    this.rodada = new RodadaSerializer();
  }

  fromJson(json) {
    const rodadaMataMata = {};

    Object.assign(
      rodadaMataMata,
      json.rodadas && {
        rodadas: json.rodadas.map((item) =>
          this.rodada.fromJson(item)
        ),
      }

      
    );

    return rodadaMataMata;
  }

  toJson(controleMataMata) {
    const controleMataMataToJson = {};

    Object.assign(
      controleMataMataToJson,
      
    
    );

    return controleMataMataToJson;
  }
}
