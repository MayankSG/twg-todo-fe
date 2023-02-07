import instance from "../instances/axiosInstance";

export const taskList = () => {
  return instance.get("api/v1/task");
};

export const deleteTask = (id) => {
  return instance.delete(`${"api/v1/task/" + id}`);
};

export const createTask = (data) => {
  return instance.post(`${"api/v1/task/"}`, data);
};

export const updateTask = (data, id) => {
  return instance.put(`${"api/v1/task/" + id}`, data);
};

export const singleTask = (id) => {
  return instance.get(`${"api/v1/task/" + id}`);
};
