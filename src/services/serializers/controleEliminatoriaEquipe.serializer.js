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

  toJson(equipe) {
    const controleEliminatoriaEquipe = {};

    Object.assign(
      controleEliminatoriaEquipe,
      equipe.id && { id: equipe.id },
      equipe.equipeId && { equipeId: equipe.equipeId },
      equipe.statusValidacao && { statusValidacao: equipe.statusValidacao },
      equipe.tempo && { tempo: equipe.tempo },
      equipe.equipe && {
        equipe: this.equipeSerializer.fromJson(equipe.equipe),
      },
      { isDesclassificado: equipe.isDesclassificado },
      { pontuacao: equipe.pontuacao }
    );

    return controleEliminatoriaEquipe;
  }
}
