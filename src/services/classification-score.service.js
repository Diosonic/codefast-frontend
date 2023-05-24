import api from "./api.service";
import CoreApiService from "./core-api.service";
import ClassificationScoreSerializer from "./serializers/classification-score.serializer";

export default class ClassificationScoreService extends CoreApiService {
  constructor() {
    super(undefined, "classification", new ClassificationScoreSerializer());
  }

  async getProgress() {
    this.endpoint = "progress";
    this.parentEndpoint = "classification";

    const response = await api.get(`${this.parentEndpoint}/${this.endpoint}`);

    const data = response.data.item;
    return this.serializer.fromJson(data);
  }
}
