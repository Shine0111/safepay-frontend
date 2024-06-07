import React from "react";
import styles from "./CartSummary.module.css";

const CartSummary = ({ total }) => {
  return (
    <div className={styles.cartSummary}>
      <h2>Summary</h2>
      <div>Total: ${total}</div>
      <button className="btn">Checkout, coming soon.</button>
    </div>
  );
};

export default CartSummary;
