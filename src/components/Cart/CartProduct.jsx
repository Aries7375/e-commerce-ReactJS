import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { getUserCart } from "../../store/slices/cart.slice";
import getConfig from "../../utils/getConfig";
import "./styles/cartProduct.css";

const CartProduct = ({ pro }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    const URL = `https://e-commerce-api.academlo.tech/api/v1/cart/${pro.id}`;
    axios
      .delete(URL, getConfig())
      .then((res) => dispatch(getUserCart()))
      .catch((err) => console.log(err));
  };
  return (
    <article className="cart-product">
      <header>
        <div className="cart-titles">
          <h4>{pro.brand}</h4>
          <h3>{pro.title}</h3>
        </div>
        <button onClick={deleteProduct}>
          <i className="bx bx-trash"></i>
        </button>
      </header>

      <div className="cart-pro-quan">{pro.productsInCart.quantity}</div>
      <div className="cart-subTotal">
        <p>Sub Total:</p>
        <span>$ {pro.price * pro.productsInCart.quantity}</span>
      </div>
    </article>
  );
};

export default CartProduct;
