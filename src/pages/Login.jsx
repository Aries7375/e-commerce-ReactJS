import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../components/styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, reset, register } = useForm();
  const submit = (data) => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/users/login";
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data.data.user.firstName);
        localStorage.setItem("firstName", res.data.data.user.firstName);
        localStorage.setItem("lastName", res.data.data.user.lastName);
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      })
      .catch((err) => console.log(err));
    reset({
      email: "",
      password: "",
    });
  };
  //!academlo
  const [isLog, setIsLog] = useState(false);
  useEffect(() => {
    const condition = localStorage.getItem("token") ? true : false;
    setIsLog(condition);
  }, []);
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    setIsLog(false);
  };
  if (isLog) {
    return (
      <div className="user-logged-cont">
        <div>
          <i className="bx bxs-user"></i>
        </div>
        <p>
          {localStorage.getItem("firstName")} {localStorage.getItem("lastName")}
        </p>
        <button onClick={logoutUser}>Log out</button>
      </div>
    );
  }
  return (
    <div className="login-cont">
      <h2>Welcome! Enter your email and password to continue</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Example: john@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="example: john1234"
          />
        </div>
        <button>Login</button>
        <p>
          Don't have an account? <span>Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
