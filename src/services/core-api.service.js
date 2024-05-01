import api from "./api.service";

export default class CoreApiService {
  constructor(_parentEndpoint, _endpoint, _serializer) {
    this.parentEndpoint = _parentEndpoint;
    this.endpoint = _endpoint;
    this.serializer = _serializer;
  }

  async read(id) {
    const response = await api.get(`${this.endpoint}/${id}`);

    const data = response.data;
    return this.serializer.fromJson(data);
  }

  async list(queryOptions = null, isListView = null) {
    const response = await api.get(
      `${this.endpoint}?${(queryOptions && queryOptions.toQueryString()) || ""}`
    );

    const data = response.data;

    if (data && isListView) {
      return this.convertData(data, data._meta);
    } else {
      return this.convertData(data);
    }
  }

  async listSub(parentId, queryOptions = null, isListView = null) {
    const response = await api.get(
      `${this.parentEndpoint}/${parentId}/${this.endpoint}?${
        (queryOptions && queryOptions.toQueryString()) || ""
      }`
    );

    const data = response.data;
    if (data.hasOwnProperty("items") && isListView) {
      return this.convertData(data, data._meta);
    } else if (data.hasOwnProperty("items")) {
      return this.convertData(data.items);
    } else {
      return this.convertData(data);
    }
  }

  async create(item) {
    const response = await api.post(
      `${this.endpoint}`,
      this.serializer.toJson(item)
    );

    const data = response.data.item;

    return this.serializer.fromJson(data);
  }

  async createSub(item, isFormData = false) {
    const response = await api.post(
      `${this.parentEndpoint}/${item.parentId}/${this.endpoint}`,
      isFormData
        ? this.serializer.toFormData(item)
        : this.serializer.toJson(item)
    );

    const data = response.data;
    return this.serializer.fromJson(data.oret);
  }

  async update(item, isFormDate = false) {
    const response = await api.put(
      `${this.endpoint}/${item.id}`,
      isFormDate
        ? this.serializer.toFormData(item)
        : this.serializer.toJson(item)
    );

    const data = response.data.item;
    return this.serializer.fromJson(data);
  }

  async updateSub(id = null, item) {
    const ref = id ? id : item.id;
    const response = await api.put(
      `${this.parentEndpoint}/${ref}/${this.endpoint}`,
      this.serializer.toJson(item)
    );

    const data = response.data;
    return data.oret.map((item) => this.serializer.fromJson(item));
  }

  async delete(id) {
    debugger;
    const response = await api.delete(`${this.endpoint}/${id}`);
    return response;
  }

  convertData(data = null, meta = null) {
    if (meta) {
      const items = data.items.map((item) => this.serializer.fromJson(item));
      const _meta = this.metaSerializer.fromJson(meta);
      return { items: items, meta: _meta };
    } else {
      if (data.items) {
        const items = data.items.map((item) => this.serializer.fromJson(item));
        return items;
      } else {
        const items = data.map((item) => this.serializer.fromJson(item));
        return items;
      }
    }
  }
}
