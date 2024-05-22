import api from "./api.service";
import CoreApiService from "./core-api.service";
import TorneioSerializer from "./serializers/torneio.serializer";

export default class TorneioService extends CoreApiService {
  constructor() {
    super(undefined, "torneio", new TorneioSerializer());
  }

  async GetAllEquipesTorneioAsync(id) {
    this.parentEndpoint = "equipes";

    const response = await api.get(
      `${this.endpoint}/${id}/${this.parentEndpoint}/`
    );

    const data = { equipes: response.data };
    return this.serializer.fromJson(data);
  }

  async AlteraStatusTempo(id) {
    this.parentEndpoint = "altera-status-tempo";

    const response = await api.put(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = response.data;

    return data;
  }

  async ResetarStatusTempo(id) {
    this.parentEndpoint = "resetar-status-tempo";

    const response = await api.put(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = response.data;

    return data;
  }
}
