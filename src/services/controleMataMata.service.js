import api from "./api.service";
import CoreApiService from "./core-api.service";
import ControleMataMataSerializer from "./serializers/controleMataMata.serializer";

export default class ControleMataMataService extends CoreApiService {
  constructor() {
    super(
      undefined,
      "ControleMataMata",
      new ControleMataMataSerializer()
    );
  }



}
