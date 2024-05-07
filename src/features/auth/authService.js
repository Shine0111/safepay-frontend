import apiClient from "../../services/api-client";

const API_URL = "/user/";

const register = async (userData) => {
  const response = await apiClient.post(API_URL + "register", {
    uname: userData.name,
    email: userData.email,
    pw: userData.password,
  });
  if (response.data) {
  }
  return response.data;
};

const login = async (userData) => {
  const response = await apiClient.post(API_URL + "login", {
    uname: userData.name,
    pw: userData.password,
  });
  if (response.data) {
  }
  return response.data;
};

const getLocalUser = async () => {
  const response = await apiClient.get(API_URL);
  return response.data;
};

const authService = { register, login, getLocalUser };

export default authService;
