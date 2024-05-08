import React, { useState } from "react";
import { createProduct } from "../features/products/productSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
  });
  const { name } = product;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const productData = { name };
    dispatch(createProduct(productData));
    toast.success("Product Created!");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Product</label>

          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
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
