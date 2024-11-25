import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Register from "./components/Register";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import BlogsList from "./components/BlogsList";
import Navbar from "./components/Navbar";

function App() {
  const [blogs, setBlogs] = useState([]);

  async function getAllBolgs() {
    try {
      let res = await axios.get("https://blogapp-034p.onrender.com/blogs/");
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBolgs();
  }, []);

  console.log(blogs);
  // Delet a blog

  async function deleteBlog(id) {
    try {
      if (window.confirm("Are you sure")) {
        let res = await axios.delete(
          `https://blogapp-034p.onrender.com/blogs/${id}`
        );
        console.log(res.data);
        setBlogs(blogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // update code
  // async function updateBlog(id) {
  //   try {
  //     let res = await axios.put(`https://blogapp-034p.onrender.com/blogs/${id}`);
  //     console.log(res.data);
  //     setBlogs(blogs.filter((blog) => blog._id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/newblog"
            element={<BlogForm getAllBolgs={getAllBolgs} />}
          />
          <Route
            path="/blogs"
            element={<BlogsList blogs={blogs} deleteBlog={deleteBlog} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
