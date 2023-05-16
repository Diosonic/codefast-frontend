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
        json.password && {
          password: json.password,
        },
        json.email && {
          email: json.email,
        },
        json.status && {
          status: json.status,
        },
        json.profile && {
          profile: json.profile,
        }
      );
  
      return user;
    }
  
    toJson(user) {
      const userToJson = {};
  
      Object.assign(
        userToJson,
        user.name && { name: user.name },
        user.email && { email: user.email },
        user.password && { password: user.password },
        user.profile && { profile: user.profile },
  
        user.status !== undefined && { status: user.status }
      );
      return userToJson;
    }
  }