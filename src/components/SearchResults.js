import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResultProducts, reset } from "../features/search/searchSlice";
import { useParams } from "react-router-dom";
import { Spinner, ProductItem } from "./index";

function SearchResults() {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const { resultProducts, isLoading, isError, message } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    if (isError) console.log(message);
    dispatch(getResultProducts(category_id));
    return () => dispatch(reset());
  }, [category_id, isError, message, dispatch]);
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className="container">
        {resultProducts.length > 0 && (
          <div className="goals">
            {resultProducts &&
              resultProducts.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  onDelete={() => {
                    console.log("Can't delete this!");
                  }}
                />
              ))}
          </div>
        )}
      </section>
    </>
  );
}

export default SearchResults;
