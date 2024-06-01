import apiClient from "../../services/api-client";

const API_URL = "/api/products/";

const createProduct = async (productData) => {
  const response = await apiClient.post(API_URL, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getProducts = async () => {
  const response = await apiClient.get(API_URL);
  return response.data;
};

const getProduct = async (id) => {
  const response = await apiClient.get(`${API_URL}?id=${id}`);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await apiClient.delete(API_URL + id);
  return response.data;
};

const getProductCategories = async () => {
  const response = await apiClient.get(API_URL + "categories");
  return response.data;
};

const getProductSubCategories = async () => {
  const response = await apiClient.get(API_URL + "sub-categories");
  return response.data;
};

const productService = {
  getProductCategories,
  getProductSubCategories,
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
};
export default productService;
