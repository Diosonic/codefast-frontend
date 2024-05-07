import RodadaMataMataSerializer from "./rodadaMataMata.serializer";

export default class ControleMataMataSerializer {
  constructor() {
    this.rodadaMataMata = new RodadaMataMataSerializer();
  }

  fromJson(json) {
    const controleMataMata = {};

    Object.assign(
      controleMataMata,
      json.statusValidacao && {
        statusValidacao: json.statusValidacao,
      },

      json.rodadas && {
        rodadas: json.rodadas.map((item) =>
          this.rodadaMataMata.fromJson(item)
        ),
      }

      
    );

    return controleMataMata;
  }

  toJson(controleMataMata) {
    const controleMataMataToJson = {};

    Object.assign(controleMataMataToJson);

    return controleMataMataToJson;
  }
}
