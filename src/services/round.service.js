import CoreApiService from "./core-api.service";
import RoundSerializer from "./serializers/round.serializer";

export default class RoundService extends CoreApiService {
  constructor() {
    super(undefined, "rounds", new RoundSerializer());
  }
}
