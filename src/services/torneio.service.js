import api from "./api.service";
import CoreApiService from "./core-api.service";
import TorneioSerializer from "./serializers/torneio.serializer";

export default class TorneioService extends CoreApiService {
  constructor() {
    super(undefined, "torneio", new TorneioSerializer());
  }

  async GetAllEquipesTorneioAsync(id) {
    debugger;
    this.parentEndpoint = "equipes";

    const response = await api.get(`${this.endpoint}/${id}/${this.parentEndpoint}/`);

    const data = response.data;
    return this.serializer.fromJson(data);
  }
}


