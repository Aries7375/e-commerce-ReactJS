import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../components/Cart/CartProduct";
import { getUserCart } from "../store/slices/cart.slice";
import getConfig from "../utils/getConfig";

const Cart = () => {
  const dispatch = useDispatch();
  const checkout = () => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/purchases";
    const data = {
      street: "Green St. 1456",
      colony: "Southwest",
      zipCode: 12345,
      city: "USA",
      references: "Some references",
    };

    axios
      .post(URL, data, getConfig())
      .then((res) => {
        console.log(res.data);
        dispatch(getUserCart());
      })
      .catch((err) => console.log(err));
  };
  const { cart } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  return (
    <section className="cart-cont">
      <h2>My shopping Cart</h2>
      <div>
        {cart?.map((pro) => (
          <CartProduct key={pro.id} pro={pro} />
        ))}
      </div>
      <div className="cart-footer">
        <span>Total:</span>
        <p>
          $
          {cart
            ? cart.reduce((acc, cv) => {
                return cv.price * cv.productsInCart.quantity + acc;
              }, 0)
            : 0}
        </p>
      </div>
      <button onClick={checkout} className="cart-footer-btn">
        Checkout
      </button>
    </section>
  );
};

export default Cart;
