import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardProduct from "../components/home/CardProduct";
import ProductDescription from "../components/productInfo/ProductDescription";
import SliderImg from "../components/productInfo/SliderImg";
import "../components/styles/productInfo.css";

const ProductInfo = () => {
  const allProducts = useSelector((state) => state.products);
  const [product, setProduct] = useState();
  const [similarProducts, setSimilarProducts] = useState();
  const { id } = useParams();
  useEffect(() => {
    const URL = `https://e-commerce-api.academlo.tech/api/v1/products/${id}`;
    axios
      .get(URL)
      .then((res) => setProduct(res.data.data.product))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (allProducts && product) {
      const category = allProducts.filter(
        (pro) => pro.category.name == product.category
      );
      setSimilarProducts(category);
    }
  }, [allProducts, product]);

  return (
    <div className="productInfo-cont">
      <div className="route">
        <a href="/">Home</a>
        <div></div>
        <p>{product?.title}</p>
      </div>
      <div className="main">
        <SliderImg listImg={product?.productImgs} />
        <ProductDescription product={product} />
      </div>

      <section className="similar-products-cont">
        <h2>Discover similar items</h2>
        <div className="similar-products">
          {similarProducts?.map((prod) => {
            if (prod.title !== product.title) {
              return <CardProduct key={prod.id} product={prod} />;
            }
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductInfo;
