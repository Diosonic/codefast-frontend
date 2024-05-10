import api from "./api.service";
import CoreApiService from "./core-api.service";
import RodadaMataMataSerializer from "./serializers/rodadaMataMata.serializer";

export default class RodadaMataMataService extends CoreApiService {
  constructor() {
    super(undefined, "rodada", new RodadaMataMataSerializer());
  }
  
  async GetRodadaEmAndamento(id) {
    this.parentEndpoint = "rodada-andamento";

    const response = await api.get(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = { rodadas: response.data };

    return this.serializer.fromJson(data);
  }

  async CriaRodadasEtapaMataMata(id){

    this.parentEndpoint = "cria-rodadas";

    const response = await api.post(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = response.data;
    
    return data;
  }







}
