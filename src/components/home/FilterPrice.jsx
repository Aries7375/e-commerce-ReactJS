import React from "react";
import useComerse from "../../hook/useComerse";

const FilterPrice = ({ setInputPrice }) => {
  const captureData = (e) => {
    e.preventDefault();
    const inputFrom = e.target.from.value;
    const inputTo = e.target.to.value;
    if (inputFrom && inputTo) {
      setInputPrice({
        from: inputFrom,
        to: inputTo,
      });
    } else if (!inputFrom && inputTo) {
      setInputPrice({
        from: 0,
        to: inputTo,
      });
    } else if (inputFrom && !inputTo) {
      setInputPrice({
        from: inputFrom,
        to: Infinity,
      });
    } else {
      setInputPrice({
        from: 0,
        to: Infinity,
      });
    }
  };
  const { open1, setOpen1 } = useComerse();
  return (
    <section className={`filter-section ${open1 ? "" : "close-section"}`}>
      <div className="filter-title" onClick={() => setOpen1(!open1)}>
        <span>Price</span>
        <span className="filter-top-arrow">
          <i className="bx bx-chevron-up"></i>
        </span>
      </div>
      <div className="filter-price-info">
        <form onSubmit={captureData}>
          <div>
            <label htmlFor="from">From</label>
            <input type="number" min="0" name="from" id="from" />
          </div>
          <div>
            <label htmlFor="to">To</label>
            <input type="number" min="275" name="to" id="to" />
          </div>
          <button>Filter Price</button>
        </form>
      </div>
    </section>
  );
};

export default FilterPrice;
