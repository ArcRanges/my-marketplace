import client from "./client";

const endpoint = "/ratings";

const getRatingsByUserId = (userId) => {
  return client.get(`${endpoint}/${userId}`);
};

const rateUserById = (userId, rating) => {
  return client.post(`${endpoint}/${userId}`, rating);
};

export default {
  getRatingsByUserId,
  rateUserById,
};
