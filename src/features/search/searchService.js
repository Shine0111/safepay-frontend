import apiClient from "../../services/api-client";

const API_URL = "/api/products/search";

const getResultProducts = async (category_id) => {
  const response = await apiClient.get(`${API_URL}?category=${category_id}`);
  return response.data;
};

const searchService = {
  getResultProducts,
};

export default searchService;
