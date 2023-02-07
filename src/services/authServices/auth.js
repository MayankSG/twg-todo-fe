import instance from "../instances/axiosInstance";

export const login = (data) => {
  return instance.post("api/v1/users/login", data);
};

export const signUp = (data) => {
  return instance.post("api/v1/users/signup", data);
};
