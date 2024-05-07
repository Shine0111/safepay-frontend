import apiClient from "../../services/api-client";

const API_URL = "/user/register";

const register = async (userData) => {
  const response = await apiClient.post(API_URL, {
    uname: userData.name,
    email: userData.email,
    pw: userData.password,
  });
  if (response.data) {
  }
  return response.data;
};

const authService = { register };

export default authService;
