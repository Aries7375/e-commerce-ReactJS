import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useComerse from "../../hook/useComerse";
import {
  getAllProducts,
  getProductsByCategory,
} from "../../store/slices/products.slices";

const FilterCategory = ({ setInputValue }) => {
  const { open2, setOpen2 } = useComerse();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState();
  useEffect(() => {
    const URL =
      "https://e-commerce-api.academlo.tech/api/v1/products/categories";
    axios
      .get(URL)
      .then((res) => setCategories(res.data.data.categories))
      .catch((err) => console.log(err));
  }, []);

  const clickCategory = (id) => {
    dispatch(getProductsByCategory(id));
    setInputValue("");
  };
  const handleAll = () => {
    dispatch(getAllProducts());
    setInputValue("");
  };
  return (
    <section className={`filter-section ${open2 ? "" : "close-section"}`}>
      <div className="filter-title" onClick={() => setOpen2(!open2)}>
        <span>Categories</span>
        <span className="filter-top-arrow">
          <i className="bx bx-chevron-up"></i>
        </span>
      </div>
      <div className="filter-category-info">
        <ul>
          <li onClick={handleAll}>All Products</li>
          {categories?.map((category) => (
            <li key={category.id} onClick={() => clickCategory(category?.id)}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FilterCategory;
