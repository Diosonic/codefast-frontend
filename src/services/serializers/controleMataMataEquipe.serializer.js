
export default class ControleMataMataEquipeSerializer {

  fromJson(json) {
    const controleMataMataEquipe = {};

    Object.assign(
      controleMataMataEquipe,
      json.id && { id: json.id },
      json.equipeId && { equipeId: json.equipeId },
      json.equipe && {
        nome: json.equipe.nome
      },
      json.statusValidacao && { statusValidacao: json.statusValidacao }
    );

    return controleMataMataEquipe;
  }

  toJson(controleMataMata) {
    const controleMataMataToJson = {};

    Object.assign(controleMataMataToJson);

    return controleMataMataToJson;
  }
}
