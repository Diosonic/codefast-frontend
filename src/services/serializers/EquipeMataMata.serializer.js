
export default class EquipeMataMataSerializer {

  fromJson(json) {
    const sementeRodada = {};

    Object.assign(
      sementeRodada,
      json.nome && { name: json.nome },
      json.controleMataMata && {
        statusValidacao: json.controleMataMata.statusValidacao,
      },
      json.isDesclassificado && {
        isDesclassificado: json.isDesclassificado,
      }
    );

    return sementeRodada;
  }
}
