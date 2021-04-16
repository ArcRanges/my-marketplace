import client from "./client";

const endpoint = "/conversations/";

const removeConversation = async (conversationId) =>
  client.delete(`${endpoint}/${conversationId}`);

export default {
  removeConversation,
};
