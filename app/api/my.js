import client from "./client";

const endpoint = "/my";

const getMyListings = () => client.get(`${endpoint}/listings`);

const getMyConversations = () => client.get(`${endpoint}/conversations`);

export default {
  getMyListings,
  getMyConversations,
};
