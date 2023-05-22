export default class UserSerializer {
  fromJson(json) {
    const user = {};

    Object.assign(
      user,
      json.id && {
        id: json.id,
        value: json.id,
        label: json.name,
      },
      json.name && {
        name: json.name,
      },
      json.email && {
        email: json.email,
      }
    );

    return user;
  }

  toJson(user) {
    const userToJson = {};

    Object.assign(
      userToJson,
      user.name && { name: user.name },
      user.email && { email: user.email }
    );
    return userToJson;
  }
}
