import React, { useState } from "react";
import { createProduct } from "../features/products/productSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
  });
  const { name } = product;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const productData = { name };
      dispatch(createProduct(productData));
      setTimeout(() => {
        navigate("/allProducts");
      }, 1000);
      toast.success(
        "Product Created! You'are being redirected to all your Products",
        {
          autoClose: 2000,
        }
      );
    } catch (error) {
      console.error("Error navigating:", error);
      toast.error("Error navigating: " + error.message);
    }
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text" style={{ fontWeight: "bolder" }}>
            Create new Product
          </label>

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
