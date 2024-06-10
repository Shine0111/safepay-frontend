import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeCartItem } from "../features/cart/cartSlice";
import styles from "./CartPage.module.css";
import { CartItem, CartSummary } from "./index";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { isLoading, cart } = useSelector((state) => state.cart);
  const [isTotalLoading, setIsTotalLoading] = useState(false);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemoveCartItem = async (itemId) => {
    setIsTotalLoading(true); // Show skeleton while total is updating
    await dispatch(removeCartItem(itemId));
    await dispatch(getCart());
    setIsTotalLoading(false); // Ensure the total is updated
  };

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      <div className={styles.itemsAndSummaryContainer}>
        {isLoading ? (
          <>
            <div className={styles.cartItemsSkeleton}>
              <div>
                <Skeleton count={1} height={10} width={300} />
                <Skeleton count={1} height={10} width={600} />
                <Skeleton count={1} height={10} width={200} />
              </div>
              <div>
                <Skeleton count={1} width={70} height={70} borderRadius={7} />
              </div>
            </div>
            <div className={styles.cartSummary}>
              <Skeleton height={100} />
            </div>
          </>
        ) : (
          <>
            {cart && (
              <>
                <div className={styles.cartItems}>
                  {cart.cartItems.map((cartItem) => (
                    <CartItem
                      key={cartItem._id}
                      cartItem={cartItem}
                      onClick={() => handleRemoveCartItem(cartItem._id)}
                    />
                  ))}
                </div>
                <div className={styles.cartSummary}>
                  {/* summary component here */}
                  {/* This part can include total price, checkout button, etc. */}
                  {isTotalLoading ? (
                    <Skeleton height={70} />
                  ) : (
                    <CartSummary total={cart.cart.total} />
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
