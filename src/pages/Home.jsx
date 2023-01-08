import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardProduct from "../components/home/CardProduct";
import FilterCategory from "../components/home/FilterCategory";
import FilterPrice from "../components/home/FilterPrice";
import OrderProducts from "../components/home/OrderProducts";
import "../components/styles/home.css";
import useComerse from "../hook/useComerse";
import { setProductsGlobal } from "../store/slices/products.slices";

const Home = () => {
  const { products } = useSelector((state) => state);
  const allProductsFilter = useSelector((state) => state.products);
  const [close, setClose] = useState(true);
  const closeFilter = () => {
    setClose(true);
  };
  const openFilter = () => {
    setClose(false);
  };

  //! filter academlo
  const [productsFilter, setProducstFilter] = useState();
  const [inputValue, setInputValue] = useState();
  const [inputPrice, setInputPrice] = useState({
    from: 0,
    to: Infinity,
  });
  const change = (e) => {
    const filter = products?.filter((prod) =>
      prod.title.toLowerCase().includes(e.target.value.toLowerCase().trim())
    );
    setProducstFilter(filter);
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (products) {
      setProducstFilter(products);
    }
  }, [products]);
  const filterPriceCallBack = (pro) =>
    Number(pro.price) >= inputPrice.from && Number(pro.price) <= inputPrice.to;
  const { open1, open2, setOpen1, setOpen2 } = useComerse();
  return (
    <div className="home">
      <aside>
        <div className="filter-fixed">
          <div>
            <FilterPrice setInputPrice={setInputPrice} />
            <FilterCategory setInputValue={setInputValue} />
            <OrderProducts />
          </div>
        </div>
      </aside>
      <div className="home-main">
        <div className="form-filter-cont">
          <form className="home-form">
            <input
              value={inputValue}
              onChange={change}
              type="text"
              placeholder="What are you looking for?"
            />
            <button>
              <i className="bx bx-search-alt-2"></i>
            </button>
          </form>
          <button className="filter-btn" onClick={openFilter}>
            <i className="bx bx-filter-alt"></i>
          </button>
        </div>
        <div className={`filter-menu ${close && "close"}`}>
          <button className="close-filter" onClick={closeFilter}>
            <i className="bx bx-x"></i>
          </button>
          <h5>Filters</h5>
          <FilterPrice setInputPrice={setInputPrice} />
          <FilterCategory setInputValue={setInputValue} />
          <OrderProducts />
        </div>
        <div className="products-cont">
          {productsFilter?.filter(filterPriceCallBack).length !== 0 ? (
            productsFilter
              ?.filter(filterPriceCallBack)
              .map((product) => (
                <CardProduct key={product.id} product={product} />
              ))
          ) : (
            <h2>Not exist products to this filter</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
