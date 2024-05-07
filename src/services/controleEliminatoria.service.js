import api from "./api.service";
import CoreApiService from "./core-api.service";
import ControleEliminatoriaSerializer from "./serializers/controleEliminatoria.serializer";
import ControleEliminatoriaEquipeSerializer from "./serializers/controleEliminatoriaEquipe.serializer";

export default class ControleEliminatoriaService extends CoreApiService {
  constructor() {
    super(
      undefined,
      "ControleEliminatoria",
      new ControleEliminatoriaSerializer()
    );
  }

  async GetControleEliminatoriaById(id) {
    this.serializer = new ControleEliminatoriaEquipeSerializer();

    const response = await api.get(`${this.endpoint}/${id}`);

    const data = response.data;

    return this.serializer.fromJson(data);
  }

  async GetAllEquipesCredenciadasEliminatoria(id) {
    this.parentEndpoint = "equipes";

    const response = await api.get(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = { controleEliminatoria: response.data };

    return this.serializer.fromJson(data);
  }

  async GetAllEquipesCredenciadasValidando(id) {
    this.parentEndpoint = "equipes";

    const response = await api.get(
      `${this.endpoint}/${id}/${this.parentEndpoint}/validando`
    );

    const data = { controleEliminatoria: response.data };

    return this.serializer.fromJson(data);
  }

  async AlteraStatusValidacao(item) {
    this.parentEndpoint = "equipes";

    const response = await api.put(
      `${this.endpoint}/${item.id}/${this.parentEndpoint}`,
      this.serializer.toJson(item)
    );

    const data = response.data;

    return this.serializer.toJson(data);
  }
}
