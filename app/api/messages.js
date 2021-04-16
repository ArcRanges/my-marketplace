import client from "./client";

const endpoint = "messages";

const sendMessage = async (listing, text, conversationId) => {
  return client.post(`${endpoint}/${listing._id}`, { text, conversationId });
};

const getMessages = () => client.get(`/${endpoint}`);

export default {
  sendMessage,
  getMessages,
};
