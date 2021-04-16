import client from "./client";

const endpoint = "/categories";

const getCategories = () => client.get(endpoint);

export default {
  getCategories,
};
