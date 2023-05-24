import CoreApiService from "./core-api.service";
import SeedSerializer from "./serializers/seed.serializer";

export default class SeedService extends CoreApiService {
  constructor() {
    super(undefined, "seeds", new SeedSerializer());
  }
}
