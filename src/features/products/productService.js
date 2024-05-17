import apiClient from "../../services/api-client";

const API_URL = "/api/products/";

const createProduct = async (productData) => {
  const response = await apiClient.post(API_URL, productData);
  return response.data;
};

const getProducts = async () => {
  const response = await apiClient.get(API_URL);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await apiClient.delete(API_URL + id);
  return response.data;
};

const productService = { createProduct, getProducts, deleteProduct };
export default productService;
