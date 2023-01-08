import React from "react";
import { useDispatch } from "react-redux";
import {
  ascendingProducts,
  descendingProducts,
} from "../../store/slices/products.slices";

const OrderProducts = () => {
  const dispatch = useDispatch();
  return (
    <div className="order-buttons">
      <button onClick={() => dispatch(ascendingProducts())}>
        Ascending Order
      </button>
      <button onClick={() => dispatch(descendingProducts())}>
        Descending Order
      </button>
    </div>
  );
};

export default OrderProducts;
