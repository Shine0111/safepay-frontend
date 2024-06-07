import React from "react";
import styles from "./CartSummary.module.css";

const CartSummary = ({ total }) => {
  return (
    <div className={styles.cartSummary}>
      <h2>Summary</h2>
      <div>Total: ${total}</div>
    </div>
  );
};

export default CartSummary;
