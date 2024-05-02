export default class ControleEliminatoriaSerializer {
  fromJson(json) {
    debugger;
    const equipe = {};

  Object.assign(
    equipe,
    json.equipeId && { equipeId: json.equipeId },
    json.isDesclassificado && {}

  );
    return equipe;
  }

  toJson(equipe) {
    const equipeToJson = {};

    Object.assign(equipeToJson);

    return equipeToJson;
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