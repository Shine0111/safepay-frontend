import React from "react";

function ProductItem({ product }) {
  return (
    <div className="task">
      <div>{new Date(product.createdAt).toLocaleString("en-US")}</div>
      <h2>{product.name}</h2>
    </div>
  );
}

export default ProductItem;
