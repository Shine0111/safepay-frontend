import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResultProducts, reset } from "../features/search/searchSlice";
import { useParams } from "react-router-dom";
import { Spinner, ProductItem } from "./index";
import styles from "./SearchResults.module.css";
import { useNavigate } from "react-router-dom";

function SearchResults() {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resultProducts, isLoading, isError, message } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    if (isError) console.log(message);
    dispatch(getResultProducts(category_id));
    return () => dispatch(reset());
  }, [category_id, isError, message, dispatch]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.gridContainer}>
      <div>Filtering params</div>
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
                  onSuccess={handleProductClick(product)}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default SearchResults;
