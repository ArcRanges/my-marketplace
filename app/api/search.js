import client from "./client";

const endpoint = "/search";

const getListingsByUserId = (userId) => {
  const route = "listingByUserId";
  return client.get(`${endpoint}/${route}/${userId}`);
};

const getListingsByCategoryId = (catId) => {
  const route = "listingByCategoryId";
  return client.get(`${endpoint}/${route}/${catId}`);
};

export default {
  getListingsByUserId,
  getListingsByCategoryId,
};
