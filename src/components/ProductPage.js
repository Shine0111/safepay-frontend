import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../features/products/productService";
import Spinner from "./Spinner";
import styles from "./ProductPage.module.css";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productService.getProduct(id);
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]);
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
            <div className={styles.price}>$99.99</div>{" "}
            {/* Example static price */}
            <button className={styles.addToCartButton}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
