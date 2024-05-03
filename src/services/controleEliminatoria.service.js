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

    const response = await api.get(
      `${this.endpoint}/${id}/${this.parentEndpoint}/`
    );

    const data = { controleEliminatoria: response.data };

    return this.serializer.fromJson(data);
  }

  async AlteraStatusValidacao(item) {
    debugger;
    this.parentEndpoint = "equipes";

    const response = await api.put(
      `${this.endpoint}/${item.id}/${this.parentEndpoint}`,
      this.serializer.toJson(item)
    );

    const data = response.data;

    return this.serializer.toJson(data);    
  }

  
}
