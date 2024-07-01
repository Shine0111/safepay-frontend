import React, { useState } from "react";
import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../features/cart/cartSlice";

const CartItem = ({ cartItem, onClick }) => {
  const { product_id, products_sku_id, quantity, _id } = cartItem;
  const { name, description, images, user } = product_id;
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
    // function to update the cart on the server
    dispatch(updateCartItem({ itemId: _id, quantity: selectedQuantity }));
  };

  return (
    <div className={styles.container}>
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
          <label htmlFor="quantity">Quantity:</label>
          <p>{quantity}</p>
          <select
            id="quantity"
            value={selectedQuantity}
            onChange={handleQuantityChange}
          >
            {Array.from(
              { length: products_sku_id.quantity },
              (_, i) => i + 1
            ).map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.price}>
          <p>Price: ${products_sku_id.price}</p>
        </div>
      </div>
      <div className={styles.removeContainer} onClick={onClick}>
        <p>Remove item</p>
      </div>
    </div>
  );
};

export default CartItem;
