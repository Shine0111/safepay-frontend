import React, { useState } from "react";
import { createProduct } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    images: [],
  });
  const { name, images } = product;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useSelector((state) => state.products);

  const onChange = (e) => {
    if (e.target.name === "images") {
      setProduct((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    } else {
      setProduct((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, images };

    const formData = new FormData();
    formData.append("name", productData.name);
    for (let i = 0; i < productData.images.length; i++) {
      formData.append("images", product.images[i]);
    }

    dispatch(createProduct(formData));
    navigate("/allProducts");
    if (!isLoading && isSuccess) {
      toast.success("Product Created!", {
        autoClose: 2000,
      });
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
          <label htmlFor="text" style={{ fontWeight: "bolder" }}>
            Upload images:
          </label>

          <input
            type="file"
            id="images"
            name="images"
            accept="images/*"
            multiple
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
