import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeCartItem } from "../features/cart/cartSlice";
import styles from "./CartPage.module.css";
import { CartItem, Spinner, CartSummary } from "./index";

const CartPage = () => {
  const dispatch = useDispatch();
  const { isLoading, cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      <div className={styles.itemsAndSummaryContainer}>
        {cart && (
          <>
            <div className={styles.cartItems}>
              {cart.cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem._id}
                  cartItem={cartItem}
                  onClick={() => {
                    dispatch(removeCartItem(cartItem._id));
                    dispatch(getCart());
                  }}
                />
              ))}
            </div>
            <div className={styles.cartSummary}>
              {/* summary component here */}
              {/* This part can include total price, checkout button, etc. */}
              <CartSummary total={cart.cart.total} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
