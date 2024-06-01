import React, { useEffect, useState } from "react";
import productService from "../features/products/productService";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productService.getProduct(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching the product", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div>{!product ? "Product not found" : product.name}</div>
  );
}

export default ProductPage;
