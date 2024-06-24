import React, { useEffect, useState } from "react";
import { ProductForm, ProductList } from "../../components";
import { useSelector } from "react-redux";

const DashProducts = () => {
  const [productListVisible, setProductListVisible] = useState(true);
  const [productFormVisible, setProductFormVisible] = useState(false);
  const { isCreateProductSuccess } = useSelector((state) => state.products);
  const goToProductForm = () => {
    setProductFormVisible(true);
    setProductListVisible(false);
  };
  useEffect(() => {
    if (isCreateProductSuccess) {
      setProductFormVisible(false);
      setProductListVisible(true);
    }
  }, [isCreateProductSuccess]);

  return (
    <div>
      <h1>Products</h1>
      <button onClick={goToProductForm}>Add a new product</button>
      {productFormVisible && <ProductForm />}
      {productListVisible && <ProductList />}
    </div>
  );
};

export default DashProducts;
