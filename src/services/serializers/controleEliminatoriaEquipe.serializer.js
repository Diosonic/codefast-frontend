import EquipeSerializer from "./equipe.serializer";

export default class ControleEliminatoriaEquipeSerializer {
  constructor() {
    this.equipeSerializer = new EquipeSerializer();
  }

  fromJson(json) {
    const controleEliminatoriaEquipe = {};
    debugger;
    Object.assign(
      controleEliminatoriaEquipe,
      json.id && { id: json.id },
      json.equipeId && { equipeId: json.equipeId },
      json.statusValidacao && { statusValidacao: json.statusValidacao },
      json.tempo && { tempo: json.tempo },
      json.equipe && {
        equipe: this.equipeSerializer.fromJson(json.equipe),
      },
      { isDesclassificado: json.isDesclassificado },
      { pontuacao: json.pontuacao }
    );

    return controleEliminatoriaEquipe;
  }
}
