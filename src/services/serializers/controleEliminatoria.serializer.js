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
    const controleEliminatoriaToJson = {};

    Object.assign(
      controleEliminatoriaToJson,
      controleEliminatoria.id && { id: controleEliminatoria.id },
      controleEliminatoria.statusValidacao && {
        statusValidacao: controleEliminatoria.statusValidacao,
      },
      controleEliminatoria.tempo && {
        tempo: controleEliminatoria.tempo,
      },
      controleEliminatoria.pontuacao && {
        pontuacao: controleEliminatoria.pontuacao,
      }
    );

    return controleEliminatoriaToJson;
  }
}
