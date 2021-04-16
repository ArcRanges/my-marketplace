import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import logger from "../utility/logger";

// const key = "token";

const storeToken = async (key, token) => {
  try {
    await SecureStore.setItemAsync(key, token);
  } catch (error) {
    logger.log("Error storing the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken("token");
  return token ? jwtDecode(token) : null;
};

const getToken = async (key) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    logger.log("Error getting the auth token", error);
  }
};

const removeToken = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    logger.log("Error removing the auth token", error);
  }
};

export default {
  storeToken,
  getUser,
  getToken,
  removeToken,
};
