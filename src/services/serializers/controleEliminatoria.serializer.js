import ControleEliminatoriaEquipeSerializer from "./controleEliminatoriaEquipe.serializer";

export default class ControleEliminatoriaSerializer {
  constructor() {
    this._controleEliminatoriaEquipeSerializer =
      new ControleEliminatoriaEquipeSerializer();
  }

  fromJson(json) {
    const controleEliminatoria = {};

    Object.assign(
      controleEliminatoria,
      json.controleEliminatoria && {
        controleEliminatoriaEquipes: json.controleEliminatoria.map((item) =>
          this._controleEliminatoriaEquipeSerializer.fromJson(item)
        ),
      }
    );

    return controleEliminatoria;
  }

  toJson(controleEliminatoria) {
    debugger;
    const controleEliminatoriaToJson = {};

    Object.assign(
      controleEliminatoriaToJson,
      controleEliminatoria.id && { name: controleEliminatoria.id },
      controleEliminatoria.statusValidacao && {
        statusValidacao: controleEliminatoria.statusValidacao,
      }
    );

    return controleEliminatoriaToJson;
  }
}

// equipeId
// :
// 23
// id
// :
// 19
// isDesclassificado
// :
// false
// pontuacao
// :
// 0
// statusValidacao
// :
// "Pendente"
// tempo
// :
// "00:00:00"
