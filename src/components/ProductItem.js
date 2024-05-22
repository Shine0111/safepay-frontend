import React from "react";
import placeholderImage from "../assets/images/image-placeholder.png";

function ProductItem({ product, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt="Product visuals"
            className="product-image-cover"
          />
        ) : (
          <img
            src={placeholderImage}
            alt="Product visuals"
            className="product-image-cover"
          />
        )}
      </div>
      <div className="product-details">
        <div className="product-date">
          {new Date(product.createdAt).toLocaleString("en-US")}
        </div>
        <h2 className="product-name">{product.name}</h2>
        <button className="delete-button" onClick={onDelete}>
          X
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
