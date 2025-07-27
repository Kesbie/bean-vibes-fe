import { promise, promisePaginated } from "../promise";
import { omit } from "lodash";

const getUsers: App.Services.UserService.GetUsers = async (filters) => {
  return promisePaginated<App.Types.User.UserResponse>((axios) => axios.get("/users", { params: filters }));
}

const getUser: App.Services.UserService.GetUser = async (id: string) => {
  return promise<App.Types.User.UserResponse>((axios) => axios.get(`/users/${id}`));
}

const addUser: App.Services.UserService.AddUser = async (payload) => {
  return promise<App.Types.User.UserResponse>((axios) => axios.post("/users", payload));
}

const updateUser: App.Services.UserService.UpdateUser = async (payload) => {
  return promise<App.Types.User.UserResponse>((axios) => axios.patch(`/users/${payload.id}`, omit(payload, 'id')));
}

export {
  getUser,
  getUsers,
  addUser,
  updateUser
}