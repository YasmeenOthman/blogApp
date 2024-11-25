import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValue = {
  email: "",
  password: "",
};
function Login() {
  let navigate = useNavigate();
  const [userData, setuserData] = useState(initialValue);

  function handleChange(e) {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      let newUser = {
        email: userData.email,
        password: userData.password,
      };
      let res = await axios.post("http://localhost:8000/users/login", newUser);
      console.log(res.data);
      if (res.data.status) {
        localStorage.setItem("auth-token", res.data.token);
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Login </h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
