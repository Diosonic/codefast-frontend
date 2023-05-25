import api from "./api.service";
import CoreApiService from "./core-api.service";
import SeedSerializer from "./serializers/seed.serializer";

export default class SeedService extends CoreApiService {
  constructor() {
    super(undefined, "seeds", new SeedSerializer());
  }

  async createRelationSeedsAndTeam(item) {
    debugger;

    const response = await api.post(
      `${this.endpoint}/team`,
      this.serializer.toJson(item)
    );

    const data = response.data.item;

    return this.serializer.fromJson(data);
  }

  async removeRelationSeedsAndTeam(item) {
    debugger;
    const response = await api.put(
      `${this.endpoint}/team`,
      this.serializer.toJson(item)
    );

    const data = response.data.item;

    return this.serializer.fromJson(data);
  }
}
