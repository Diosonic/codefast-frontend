import api from "./api.service";
import CoreApiService from "./core-api.service";
import ControleEliminatoriaSerializer from "./serializers/controleEliminatoria.serializer";

export default class ControleEliminatoriaService extends CoreApiService {
  constructor() {
    super(
      undefined,
      "ControleEliminatoria",
      new ControleEliminatoriaSerializer()
    );
  }

  async GetAllEquipesCredenciadasEliminatoria(id) {
    this.parentEndpoint = "equipes";
    debugger;
    const response = await api.get(
      `${this.endpoint}/${id}/${this.parentEndpoint}/`
    );

    const data = { equipes: response.data };
    return this.serializer.fromJson(data);
  }
}