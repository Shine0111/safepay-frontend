import React from "react";

function ProductItem({ product, onDelete }) {
  return (
    <div className="goal">
      <div>{new Date(product.createdAt).toLocaleString("en-US")}</div>
      <h2>{product.name}</h2>
      <button onClick={onDelete}>X</button>
    </div>
  );
}

export default ProductItem;
