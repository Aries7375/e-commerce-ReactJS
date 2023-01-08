import React from "react";
import "../styles/purchase.css";

const PurchaseCard = ({ purchase }) => {
  const datePurchase = new Date(purchase.createdAt);
  return (
    <article className="purchaseCard-cont">
      <header className="purchaseCard-header">
        <h3>{datePurchase.toLocaleDateString()}</h3>
      </header>
      <div>
        <ul>
          {purchase.cart.products.map((product) => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <span className="purchase-quan">
                {product.productsInCart.quantity}
              </span>
              <span>$ {product.price * product.productsInCart.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default PurchaseCard;
