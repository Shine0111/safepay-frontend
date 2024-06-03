import React, { useEffect, useState } from "react";
import {
  createProduct,
  getProductCategories,
  getProductSubCategories,
} from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function ProductForm() {
  const { isLoading, isCreateProductSuccess, subCategories } = useSelector(
    (state) => state.products
  );
  const [product, setProduct] = useState({
    name: "",
    description: "",
    summary: "",
    images: [],
    subCategory: "",
    skuAttributes: {
      size: "",
      color: "",
      price: 0,
      quantity: 0,
    },
  });
  const { name, description, summary, images, subCategory, skuAttributes } =
    product;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProductSubCategories());
  }, [dispatch]);

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

  const handleSKUChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      skuAttributes: {
        ...prevState.skuAttributes,
        [name]: value,
      },
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      images,
      description,
      summary,
      subCategory,
      skuAttributes,
    };

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("summary", productData.summary);
    formData.append("subCategory", productData.subCategory);
    formData.append("price", productData.skuAttributes.price);
    formData.append("quantity", productData.skuAttributes.quantity);
    formData.append("size", productData.skuAttributes.size);
    formData.append("color", productData.skuAttributes.color);
    for (let i = 0; i < productData.images.length; i++) {
      formData.append("images", product.images[i]);
    }

    dispatch(createProduct(formData));
    if (isCreateProductSuccess) {
      toast.success("Product created!", {
        autoClose: 2000,
      });
    }
  };

  if (isCreateProductSuccess) navigate("/dashboard/allProducts");

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

        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="subCategory" style={{ fontWeight: "bolder" }}>
              Your Product category:
            </label>
            <select
              id="subCategory"
              name="subCategory"
              value={product.subCategory}
              onChange={handleSubCategoryChange}
            >
              <option>Select a category</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="size" style={{ fontWeight: "bolder" }}>
            Size:
          </label>
          <input
            type="text"
            id="size"
            name="size"
            value={skuAttributes.size}
            onChange={handleSKUChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="color" style={{ fontWeight: "bolder" }}>
            Color:
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={skuAttributes.color}
            onChange={handleSKUChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" style={{ fontWeight: "bolder" }}>
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={skuAttributes.price}
            onChange={handleSKUChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity" style={{ fontWeight: "bolder" }}>
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={skuAttributes.quantity}
            onChange={handleSKUChange}
            required
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
