import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../features/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return <div>CartPage</div>;
};

export default CartPage;
