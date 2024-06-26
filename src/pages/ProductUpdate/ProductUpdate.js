import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductCategories,
  getProductSubCategories,
} from "../../features/products/productSlice";

const ProductUpdate = ({ product, onBack, onSuccess }) => {
  const { isProductUpdateSuccess, subCategories, categories } = useSelector(
    (state) => state.products
  );
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    description: product.description,
    summary: product.summary,
    category_id: product.category_id,
  });

  const { name, description, summary, category_id } = updatedProduct;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories.length) {
      dispatch(getProductCategories());
    }
    if (!subCategories.length) {
      dispatch(getProductSubCategories());
    }
  }, [dispatch, categories.length, subCategories.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: product._id, ...updatedProduct }));
  };

  useEffect(() => {
    if (isProductUpdateSuccess) {
      onSuccess();
    }
  }, [isProductUpdateSuccess, onSuccess]);

  return (
    <section className="form">
      <button onClick={onBack}>Back</button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name" style={{ fontWeight: "bolder" }}>
            Update Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" style={{ fontWeight: "bolder" }}>
            Product Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="summary" style={{ fontWeight: "bolder" }}>
            Product Summary
          </label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={summary}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category_id" style={{ fontWeight: "bolder" }}>
            Product Category
          </label>
          <select
            id="category_id"
            name="category_id"
            value={category_id}
            onChange={handleInputChange}
            required
          >
            <option>Select a category</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Update Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProductUpdate;
