import React from "react";
import placeholderImage from "../assets/images/image-placeholder.png";
import { useNavigate } from "react-router-dom";

function ProductItem({ product, onDelete }) {
  const navigate = useNavigate();
  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.images ? (
          <img
            src={product.images[0]}
            alt="Product visuals"
            className="product-image-cover"
            onClick={() => navigate(`/product/${product._id}`)}
          />
        ) : (
          <img
            src={placeholderImage}
            alt="Product visuals"
            className="product-image-cover"
            onClick={() => navigate(`/product/${product._id}`)}
          />
        )}
      </div>
      <div className="product-details">
        <div className="product-date">
          {new Date(product.createdAt).toLocaleString("en-US")}
        </div>
        <h2 className="product-name">{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.summary}</p>
        <button className="delete-button" onClick={onDelete}>
          X
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
