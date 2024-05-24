import React, { useState } from "react";
import { createProduct } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    summary: "",
    images: [],
    subCategory: "",
  });
  const { name, description, summary, images, subCategory } = product;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, subCategories } = useSelector(
    (state) => state.products
  );

  const handleNameChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };
  const handleDescriptionChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };
  const handleSummaryChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      summary: e.target.value,
    }));
  };
  const handleImagesChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      images: e.target.files,
    }));
  };

  const handleSubCategoryChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      subCategory: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, images, description, summary, subCategory };

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("summary", productData.summary);
    formData.append("subCategory", productData.subCategory);
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
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" style={{ fontWeight: "bolder" }}>
            Product description:
          </label>

          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" style={{ fontWeight: "bolder" }}>
            Product summary:
          </label>

          <input
            type="text"
            id="summary"
            name="summary"
            value={summary}
            onChange={handleSummaryChange}
            required
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
            onChange={handleImagesChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subCategory">SubCategory:</label>
          <select
            id="subCategory"
            name="subCategory"
            value={product.subCategory}
            onChange={handleSubCategoryChange}
          >
            <option value="">Select SubCategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </select>
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
