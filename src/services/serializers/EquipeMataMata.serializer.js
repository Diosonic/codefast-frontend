// import ControleMataMataService from "../controleMataMata.service";

export default class EquipeMataMataSerializer {
  // constructor() {
  //   this.rodadaMataMata = new ControleMataMataService();
  // }


  fromJson(json) {
    const sementeRodada = {};

    Object.assign(
      sementeRodada,
      json.nome && { name: json.nome },
      json.controleMataMata && {
        statusValidacao: json.controleMataMata.statusValidacao
      }
    );

    return sementeRodada;
  }

}

