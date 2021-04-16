import client from "./client";

const register = async (pushToken) =>
  client.post("/expo/registerNotifications", { token: pushToken });

const notifyUser = async (userId, message) =>
  client.post(`/expo/notifyUser/${userId}`, { message });

export default {
  register,
  notifyUser,
};
