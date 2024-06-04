import apiClient from "../../services/api-client";

const API_URL = "/api/cart/";

const addToCart = async (productId, skuId, quantity) => {
  const response = await apiClient.post(API_URL, {
    productId,
    skuId,
    quantity,
  });
  return response.data;
};

const getCart = async () => {
  const response = await apiClient.get(API_URL);
  return response.data;
};

const updateCartItem = async (itemId, quantity) => {
  const response = await apiClient.put(`${API_URL}?itemId=${itemId}`, quantity);
  return response.data;
};

const removeCartItem = async (itemId) => {
  const response = await apiClient.delete(`${API_URL}?itemId=${itemId}`);
  return response.data;
};

const cartService = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
};
export default cartService;
