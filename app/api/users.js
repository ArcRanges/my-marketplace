import client from "./client";

const endpoint = "/users";

const register = (userInfo) => client.post(endpoint, userInfo);

const getUserById = (userId) => client.get(`${endpoint}/${userId}`);

const updateUserById = (userId, update) =>
  client.put(`${endpoint}/${userId}`, update);

export default { register, getUserById, updateUserById };
