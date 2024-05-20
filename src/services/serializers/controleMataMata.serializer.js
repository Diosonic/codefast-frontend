import ControleMataMataEquipeSerializer from "./controleMataMataEquipe.serializer";

export default class ControleMataMataSerializer {
  constructor() {
    this.controleMataMataEquipe = new ControleMataMataEquipeSerializer();
  }

  fromJson(json) {
    const controleMataMata = {};

    Object.assign(
      controleMataMata,

      json.id && { id: json.id },
      json.equipeId && { equipeId: json.equipeId },
      json.statusValidacao && { statusValidacao: json.statusValidacao },
      json.equipe && {
        nome: json.equipe.nome,
      },

      json.controleMataMata && {
        controleMataMataEquipes: json.controleMataMata.map((item) =>
          this.controleMataMataEquipe.fromJson(item)
        ),
      }
    );

    return controleMataMata;
  }

  toJson(controleMataMata) {
    const controleMataMataToJson = {};

    Object.assign(
      controleMataMataToJson,
      controleMataMata.id && { id: controleMataMata.id },
      controleMataMata.statusValidacao && {
        statusValidacao: controleMataMata.statusValidacao,
      }
    );

    return controleMataMataToJson;
  }
}
