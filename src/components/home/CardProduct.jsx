import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserCart } from "../../store/slices/cart.slice";
import getConfig from "../../utils/getConfig";
import "../styles/cardProducts.css";

const CardProduct = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);
  const click = () => {
    navigate(`/product/${product.id}`);
  };
  const handleBtnClick = (e) => {
    e.stopPropagation();
    const URL = "https://e-commerce-api.academlo.tech/api/v1/cart";

    const data = {
      id: product.id,
      quantity: 1,
    };
    axios
      .post(URL, data, getConfig())
      .then((res) => {
        dispatch(getUserCart());
      })
      .catch((err) => {
        if (err.response.status == 400) {
          const URLPatch = "https://e-commerce-api.academlo.tech/api/v1/cart";
          const prevQuantity = cart.filter((e) => e.id === product.id)[0]
            .productsInCart.quantity;
          const data = {
            id: product.id,
            newQuantity: prevQuantity + 1,
          };
          axios
            .patch(URLPatch, data, getConfig())
            .then((res) => dispatch(getUserCart()))
            .catch((err) => console.log(err));
        }
      });
  };
  return (
    <article onClick={click} className="card-product">
      <header className="card-header">
        <img
          className="card-header-img"
          src={product.productImgs[0]}
          alt="product"
        />
        <img
          className="card-header-img"
          src={product.productImgs[1]}
          alt="product"
        />
      </header>
      <section className="card-info">
        <h3>{product.title}</h3>
        <article className="card-price">
          <span>Price</span>
          <h4>${product.price}</h4>
        </article>
        <button onClick={handleBtnClick}>
          <i className="bx bx-cart-alt"></i>
        </button>
      </section>
    </article>
  );
};

export default CardProduct;
