import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../features/products/productService";
import Spinner from "./Spinner";
import styles from "./ProductPage.module.css";
import cartService from "../features/cart/cartService";
import { toast } from "react-toastify";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [productSKU, setProductSKU] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const fetchedProduct = await productService.getProduct(id);
        setProductSKU(fetchedProduct.productSKU);
        setProduct(fetchedProduct.product);
        setSelectedImage(fetchedProduct.product.images[0]);
      } catch (error) {
        console.error("Error fetching the product", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    return <p>Product not found!</p>;
  }
  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      const response = await cartService.addToCart(
        product._id,
        productSKU[0]._id,
        1
      );
      // productSKU[0].quantity
      console.log(response);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsAddingToCart(false);
      toast.success("Item added to cart", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productDetailsContainer}>
        <div className={styles.imageContainer}>
          <div className={styles.thumbnailContainer}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={styles.thumbnail}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className={styles.coverImageContainer}>
            <img
              src={selectedImage}
              alt={`${product.name} cover`}
              className={styles.coverImage}
            />
          </div>
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{product.name}</h1>
          <h2>Description</h2>
          <p>{product.description}</p>
          <h2>Summary</h2>
          <p>{product.summary}</p>
          <div className={styles.purchaseSection}>
            <div className={styles.price}>${productSKU[0].price}</div>{" "}
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              {isAddingToCart ? (
                <div className="loadingSpinner"></div>
              ) : (
                <p>Add to Cart</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
