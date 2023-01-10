import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleSubmit, reset, register } = useForm();
  const signUp = (data) => {
    data.role = "admin";
    const URL = "https://e-commerce-api.academlo.tech/api/v1/users";
    axios
      .post(URL, data)
      .then((res) => navigate("/login"))
      .catch((err) => console.log(err));
    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  };
  return (
    <div className="login-cont">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(signUp)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            {...register("firstName", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            {...register("lastName", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="signPass">Password</label>
          <input
            type="password"
            name="signPass"
            id="signPass"
            placeholder="8 characters or longer"
            {...register("password", { required: true, minLength: 8 })}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone (10 characters)</label>
          <input
            type="number"
            name="phone"
            id="phone"
            {...register("phone", { required: true, minLength: 10 })}
          />
        </div>
        <button>Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Log in</span>
      </p>
    </div>
  );
};

export default SignUp;
