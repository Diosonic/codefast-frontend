
export default class EquipeMataMataSerializer {


  fromJson(json) {
    const sementeRodada = {};

    Object.assign(
      sementeRodada,
      json.nome && { name: json.nome },
      
    );

    return sementeRodada;
  }

}
