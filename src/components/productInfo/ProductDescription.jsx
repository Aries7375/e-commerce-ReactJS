import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../store/slices/cart.slice";
import getConfig from "../../utils/getConfig";
import "../styles/productDescription.css";

const ProductDescription = ({ product }) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const { cart } = useSelector((state) => state);
  const plus = () => {
    setCounter(counter + 1);
  };
  const rest = () => {
    counter !== 1 ? setCounter(counter - 1) : null;
  };
  const addCart = () => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/cart";
    const data = {
      id: product.id,
      quantity: counter,
    };
    axios
      .post(URL, data, getConfig())
      .then((res) => dispatch(getUserCart()))
      .catch((err) => {
        if (err.response.status == 400) {
          const URLPatch = "https://e-commerce-api.academlo.tech/api/v1/cart";
          const prevQuantity = cart.filter((e) => e.id == product.id)[0]
            .productsInCart.quantity;
          const data = {
            id: product.id,
            newQuantity: prevQuantity + counter,
          };
          axios
            .patch(URLPatch, data, getConfig())
            .then(dispatch(getUserCart()))
            .catch((err) => console.log(err));
        }
      });
  };
  return (
    <article className="product-section">
      <h2>{product?.title}</h2>
      <div className="product-section-reverse">
        <div className="description-price-count">
          <div className="description-price-son">
            <section>
              <span>Price</span>
              <h3>$ {product?.price}</h3>
            </section>
            <section>
              <span>Quantity</span>
              <div className="description-counter">
                <div onClick={rest}>-</div>
                <div>{counter}</div>
                <div onClick={plus}>+</div>
              </div>
            </section>
          </div>
          <button onClick={addCart}>
            Add to Cart <i className="bx bxs-cart-add"></i>
          </button>
        </div>
        <p>{product?.description}</p>
      </div>
    </article>
  );
};

export default ProductDescription;
