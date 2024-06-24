import React, { useEffect, useState } from "react";
import { ProductForm, ProductList } from "../../components";
import { useSelector } from "react-redux";

const DashProducts = () => {
  const [productListVisible, setProductListVisible] = useState(true);
  const [productFormVisible, setProductFormVisible] = useState(false);
  const { isCreateProductSuccess } = useSelector((state) => state.products);

  useEffect(() => {
    setProductFormVisible(false);
    setProductListVisible(true);
  }, []);

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

  const resetRoute = () => {
    setProductFormVisible(false);
    setProductListVisible(true);
  };
  return (
    <div>
      {productFormVisible && <div onClick={resetRoute}>Back</div>}
      <h1>Products</h1>
      {!productFormVisible && (
        <button onClick={goToProductForm}>Add a new product</button>
      )}
      {productFormVisible && <ProductForm />}
      {productListVisible && <ProductList />}
    </div>
  );
};

export default DashProducts;
