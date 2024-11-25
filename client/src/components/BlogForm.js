import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

let initialValue = {
  title: "",
  category: "",
  imageUrl: "",
  content: "",
};
function BlogForm({ getAllBolgs }) {
  const navigate = useNavigate();
  // approach 1
  const [blogForm, setBlogForm] = useState(initialValue);

  let decoded;
  let token;
  token = localStorage.getItem("auth-token");
  try {
    if (token) {
      decoded = jwtDecode(token);
      console.log(decoded);
    }
  } catch (error) {
    console.log(error);
  }

  function handleChange(e) {
    // const name = e.target.name;
    // const value = e.target.value;
    const { name, value } = e.target;
    setBlogForm({ ...blogForm, [name]: value });
  }
  //   console.log(blogForm);

  // clicking on the create button
  async function handleCreatingNewBlog(e) {
    e.preventDefault();
    try {
      let newBlog = {
        title: blogForm.title,
        category: blogForm.category,
        content: blogForm.content,
        imageUrl: blogForm.imageUrl,
        author: decoded.userId,
      };
      let res = await axios.post(
        "https://blogapp-034p.onrender.com/blogs/create",
        newBlog
      );
      alert(res.data.msg);
      getAllBolgs();
      setBlogForm(initialValue);
      navigate("/blogs");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <h1>Create New Blog</h1>
      <form onSubmit={handleCreatingNewBlog}>
        <div>
          <label htmlFor="blog-title">Title</label>
          <input
            id="blog-title"
            type="text"
            name="title"
            value={blogForm.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="blog-category">Category</label>
          <input
            id="blog-category"
            type="text"
            value={blogForm.category}
            name="category"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="blog-imageUrl">Image Url</label>
          <input
            id="blog-imageUrl"
            type="text"
            value={blogForm.imageUrl}
            name="imageUrl"
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label htmlFor="blog-author">Author</label>
          <input
            id="blog-author"
            type="text"
            value={blogForm.author}
            name="author"
            onChange={handleChange}
          />
        </div> */}
        <div>
          <label htmlFor="blog-content">Content</label>
          <textarea
            id="blog-content"
            type="text"
            value={blogForm.content}
            name="content"
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Create Blog" />
      </form>
    </div>
  );
}

export default BlogForm;
