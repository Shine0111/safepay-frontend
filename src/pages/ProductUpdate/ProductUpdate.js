import React from "react";

const ProductUpdate = ({ product, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      <div>Product: {product.name}</div>
    </div>
  );
};

export default ProductUpdate;
