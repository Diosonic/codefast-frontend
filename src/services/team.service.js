import CoreApiService from "./core-api.service";
import TeamSerializer from "./serializers/team.serializer";

export default class TeamService extends CoreApiService {
  constructor() {
    super(undefined, "team", new TeamSerializer());
  }
}


