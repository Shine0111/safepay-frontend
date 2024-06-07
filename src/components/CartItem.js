import React from "react";
import styles from "./CartItem.module.css";

const CartItem = ({ cartItem }) => {
  const { product_id, products_sku_id, quantity } = cartItem;
  const { name, description, images, user } = product_id;

  return (
    <div className={styles.cartItem}>
      <div className={styles.productInfo}>
        <div className={styles.productImage}>
          <img src={images[0]} alt={name} />
        </div>
        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{name}</h3>
          <p className={styles.productDescription}>{description}</p>
          <p className={styles.sellerInfo}>
            Sold by: {user.name} ({user.email})
          </p>
        </div>
      </div>
      <div className={styles.quantity}>
        <p>Quantity: {quantity}</p>
      </div>
      <div className={styles.price}>
        <p>Price: ${products_sku_id.price}</p>
      </div>
    </div>
  );
};

export default CartItem;
