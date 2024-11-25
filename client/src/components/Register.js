import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValue = {
  username: "",
  email: "",
  password: "",
};
function Register() {
  let navigate = useNavigate();
  const [userData, setuserData] = useState(initialValue);

  function handleChange(e) {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      let newUser = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      };
      let res = await axios.post(
        "https://blogapp-034p.onrender.com/users/register",
        newUser
      );
      alert(res.data.msg);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>SignUp </h1>
      <form onSubmit={handleRegister}>
        {" "}
        <input
          type="text"
          placeholder="username ..."
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
