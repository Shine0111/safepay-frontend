import apiClient from "../../services/api-client";

const API_URL = "/api/products/";

const createProduct = async (productData) => {
  const response = await apiClient.post(API_URL, productData);
  return response.data;
};
const productService = { createProduct };
export default productService;
