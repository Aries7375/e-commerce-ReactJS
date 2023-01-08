import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ProComponents from "./components/ProComponents";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductInfo from "./pages/ProductInfo";
import Purchases from "./pages/Purchases";
import { getUserCart } from "./store/slices/cart.slice";
import { getAllProducts } from "./store/slices/products.slices";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  //crear ususario
  // useEffect(() => {
  //   const URL = "https://e-commerce-api.academlo.tech/api/v1/users";
  //   const data = {
  //     firstName: "Dalton",
  //     lastName: "zero",
  //     email: "astra.no.aries@gmail.com",
  //     password: "    ",
  //     phone: "1234567890",
  //     role: "admin",
  //   };
  //   axios
  //     .post(URL, data)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <div className="App">
      <header className="header-main">
        <nav>
          <div>
            <p onClick={() => navigate("/")}>e-commerce</p>
          </div>
          <ul className="nav-icons">
            <li>
              <Link to="/login">
                <i className="bx bx-user"></i>
              </Link>
            </li>
            <li>
              <Link to="/purchases">
                <i className="bx bx-box"></i>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="bx bx-cart"></i>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProComponents />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchases" element={<Purchases />} />
        </Route>
        <Route path="/product/:id" element={<ProductInfo />} />
      </Routes>
      <footer>
        <p>© All rigths reserved</p>
        <div className="social-icons">
          <a href="https://www.instagram.com/">
            <i className="bx bxl-instagram"></i>
          </a>
          <a href="https://ar.linkedin.com/">
            <i className="bx bxl-linkedin"></i>
          </a>
          <a href="https://www.youtube.com/">
            <i className="bx bxl-youtube"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
