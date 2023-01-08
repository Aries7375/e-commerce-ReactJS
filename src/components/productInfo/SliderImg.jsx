import React, { useState } from "react";
import "./styles/sliderImgs.css";
const SliderImg = ({ listImg }) => {
  const [indexImg, setIndexImg] = useState(0);
  const styleCont = {
    transform: `translateX(calc(100% * -${indexImg} / 3))`,
  };
  const handleBack = () => {
    if (indexImg != 0) {
      setIndexImg(indexImg - 1);
    } else {
      setIndexImg(2);
    }
  };
  const handleNext = () => {
    if (indexImg != 2) {
      setIndexImg(indexImg + 1);
    } else {
      setIndexImg(0);
    }
  };
  return (
    <div className="slider">
      <div className="slider-child">
        <button className="slider-back" onClick={handleBack}>
          <i className="bx bx-chevron-left"></i>
        </button>
        <ul style={styleCont} className="slider-cont">
          {listImg?.map((url) => (
            <li key={url} className="slider-img-cont">
              <img src={url} alt="" />
            </li>
          ))}
        </ul>
        <button className="slider-next" onClick={handleNext}>
          <i className="bx bx-chevron-right"></i>
        </button>
        <ul className="slider-ul">
          {listImg?.map((url, index) => (
            <li
              key={url}
              className={`slider-ul-li ${
                index === indexImg && "slider-border"
              }`}
              onClick={() => setIndexImg(index)}
            >
              <img src={url} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SliderImg;

/*
import React, { useState } from "react";
import "./styles/sliderImgs.css";
const SliderImg = ({ listImg }) => {
  const [indexImg, setIndexImg] = useState(0);
  const styleCont = {
    transform: `translateX(calc(100% * -${indexImg} / 3))`,
  };
  const handleBack = () => {
    if (indexImg != 0) {
      setIndexImg(indexImg - 1);
    } else {
      setIndexImg(2);
    }
  };
  const handleNext = () => {
    if (indexImg != 2) {
      setIndexImg(indexImg + 1);
    } else {
      setIndexImg(0);
    }
  };
  return (
    <div className="slider">
      <button className="slider-back" onClick={handleBack}>
        <i className="bx bx-chevron-left"></i>
      </button>
      <div style={styleCont} className="slider-cont">
        {listImg?.map((url) => (
          <div key={url} className="slider-img-cont">
            <img src={url} alt="" />
          </div>
        ))}
      </div>
      <button className="slider-next" onClick={handleNext}>
        <i className="bx bx-chevron-right"></i>
      </button>
      <ul className="slider-ul">
        {listImg?.map((url, index) => (
          <li
            key={url}
            className={`slider-img-cont ${
              index === indexImg && "slider-border"
            }`}
            onClick={() => setIndexImg(index)}
          >
            <img src={url} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderImg;

*/
