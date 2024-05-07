import api from "./api.service";
import CoreApiService from "./core-api.service";
import ControleMataMataSerializer from "./serializers/controleMataMata.serializer";

export default class ControleMataMataService extends CoreApiService {
  constructor() {
    super(
      undefined,
      "ControleMataMata",
      new ControleMataMataSerializer()
    );
  }



  async GetRodadaEmAndamento(id) {
    this.parentEndpoint = "get-rodada-em-andamento";

    const response = await api.get(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = { rodadas: response.data };

    return this.serializer.fromJson(data);
  }


}
