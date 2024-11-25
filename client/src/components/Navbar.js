import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./navbar.css";

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
    <nav className="nav-container">
      <div>
        <h3>BlogApp</h3>
      </div>
      {token ? (
        <div className="links-container">
          <h4>Welcome {decoded.email}</h4>
          <Link to="/blogs">Blogs</Link>
          <Link to="/newblog">Create Blog</Link>
          <Link to="/login" onClick={hanldeLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="links-container">
          {" "}
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
