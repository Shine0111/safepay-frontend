import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, reset } from "../features/products/productSlice";
import Spinner from "./Spinner";
import ProductItem from "./ProductItem";

function ProductList() {
  const dispatch = useDispatch();
  const { products, isLoading, isSuccess, isError, message } = useSelector(
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
      {isSuccess && (
        <section className="content">
          {products.products.length > 0 ? (
            <div className="tasks">
              {products.products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div>No products found</div>
          )}
        </section>
      )}
    </>
  );
}

export default ProductList;
