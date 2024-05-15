import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  reset,
} from "../features/products/productSlice";
import Spinner from "./Spinner";
import ProductItem from "./ProductItem";

function ProductList() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isError) console.log(message);
    dispatch(getProducts());
    return () => dispatch(reset());
  }, [isError, dispatch, message]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
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
                />
              ))}
          </div>
        )}
      </section>
    </>
  );
}

export default ProductList;
