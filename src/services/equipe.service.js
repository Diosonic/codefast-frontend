import CoreApiService from "./core-api.service";
import EquipeSerializer from "./serializers/equipe.serializer";

export default class EquipeService extends CoreApiService {
  constructor() {
    super(undefined, "equipe", new EquipeSerializer());
  }
}
