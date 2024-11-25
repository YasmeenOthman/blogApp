import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  let token;
  let decoded;
  token = localStorage.getItem("auth-token");
  try {
    if (token) {
      decoded = jwtDecode(token);
      console.log(decoded);
    }
  } catch (error) {
    console.log(error);
  }

  function hanldeLogout() {
    if (localStorage.getItem("auth-token")) {
      localStorage.removeItem("auth-token");
      navigate("/login");
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {token ? (
        <>
          <h4>Welcome {decoded.email}</h4>
          <Link to="/blogs">Blogs</Link>
          <Link to="/newblog">Create Blog</Link>
          <Link to="/login" onClick={hanldeLogout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          {" "}
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
