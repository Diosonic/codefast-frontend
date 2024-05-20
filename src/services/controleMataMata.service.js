import api from "./api.service";
import CoreApiService from "./core-api.service";
import ControleMataMataSerializer from "./serializers/controleMataMata.serializer";

export default class ControleMataMataService extends CoreApiService {
  constructor() {
    super(undefined, "ControleMataMata", new ControleMataMataSerializer());
  }

  async GetEquipesClassificadasMataMata(id) {
    const response = await api.get(`${this.endpoint}/${id}`);

    const data = { controleMataMata: response.data };

    return this.serializer.fromJson(data);
  }

  async GetEquipesClassificadasMataMataById(id) {
    this.parentEndpoint = "equipes";

    const response = await api.get(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = response.data;

    return this.serializer.fromJson(data);
  }

  async GetAllEquipesCredenciadasValidando(id) {
    this.parentEndpoint = "equipes";

    const response = await api.get(
      `${this.endpoint}/${id}/${this.parentEndpoint}/validando`
    );

    const data = { controleMataMata: response.data };

    return this.serializer.fromJson(data);
  }

  async AlteraStatusValidacaoMataMata(item) {
    this.parentEndpoint = "alterar-status-validacao";

    const response = await api.put(
      `${this.endpoint}/${item.id}/${this.parentEndpoint}`,
      this.serializer.toJson(item)
    );

    const data = response.data;

    return this.serializer.toJson(data);
  }

  async PrepararEtapaMataMata(id) {
    this.parentEndpoint = "preparar-etapa-mata-mata";

    const response = await api.post(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = response.data;

    return data;
  }

  async DesclassificarEquipe(id) {
    this.parentEndpoint = "desclassificar-equipe";

    const response = await api.put(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = response.data;

    return data;
  }

  async PrepararEquipeDisputaTerceiroLugar(id) {
    this.parentEndpoint = "disputar-terceiro-lugar";

    const response = await api.put(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = response.data;

    return data;
  }

  async PrepararChaveTerceiroLugar(id) {
    this.parentEndpoint = "preparar-disputa-terceiro-lugar";

    const response = await api.post(
      `${this.endpoint}/${id}/${this.parentEndpoint}`
    );

    const data = response.data;

    return data;
  }
}
