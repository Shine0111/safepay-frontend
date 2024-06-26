import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  reset,
} from "../features/products/productSlice";
import Spinner from "./Spinner";
import ProductItem from "./ProductItem";
import ProductUpdate from "../pages/ProductUpdate/ProductUpdate";
import { toast } from "react-toastify";

function ProductList() {
  const [isProductUpdateVisible, setIsProductUpdateVisible] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [isAProductUpdated, setIsAProductUpdated] = useState(false);
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isError) console.log(message);
    dispatch(getProducts());
    return () => dispatch(reset());
  }, [isError, dispatch, message]);

  const handleProductClick = (product) => {
    setProductToUpdate(product);
    setIsProductUpdateVisible(true);
  };

  useEffect(() => {
    if (isAProductUpdated) {
      toast.success("Product updated!", {
        autoClose: 2000,
      });
    }
  }, [isAProductUpdated]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {!isProductUpdateVisible && (
        <section className="container">
          {products.length > 0 && (
            <div className="goals">
              {products &&
                products.map((product) => (
                  <ProductItem
                    key={product._id}
                    product={product}
                    onDelete={() => {
                      dispatch(deleteProduct(product._id));
                      dispatch(getProducts());
                    }}
                    onClick={handleProductClick}
                  />
                ))}
            </div>
          )}
        </section>
      )}
      {isProductUpdateVisible && (
        <ProductUpdate
          product={productToUpdate}
          onBack={() => {
            setIsProductUpdateVisible(false);
          }}
          onSuccess={() => {
            setIsProductUpdateVisible(false);
            setIsAProductUpdated(true);
          }}
        />
      )}
    </>
  );
}

export default ProductList;
