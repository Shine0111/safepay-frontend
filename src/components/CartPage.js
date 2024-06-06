import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../features/cart/cartSlice";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      <div className={styles.itemsAndSummaryContainer}>
        <div className={styles.cartItems}>Items</div>
        <div className={styles.cartSummary}>Summary</div>
      </div>
    </div>
  );
};

export default CartPage;
