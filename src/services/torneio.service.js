import CoreApiService from "./core-api.service";
import TorneioSerializer from "./serializers/torneio.serializer";

export default class TorneioService extends CoreApiService {
  constructor() {
    super(undefined, "torneio", new TorneioSerializer());
  }
}


