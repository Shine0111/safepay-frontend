import React, { useState } from "react";
import { createProduct } from "../features/products/productSlice";
import { useDispatch } from "react-redux";

function ProductForm() {
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ product }));
    setProduct("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Product</label>

          <input
            type="text"
            id="product"
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
