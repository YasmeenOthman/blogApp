import { jwtDecode } from "jwt-decode";

function BlogsList({ blogs, deleteBlog }) {
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
  return (
    <div>
      <h1>Blogs List</h1>
      {/* <button onClick={getAllBolgs}>Fetch Blogs</button> */}
      <div>
        {blogs.map((blog) => {
          return (
            <div key={blog._id} className="blogCrad">
              <h2>{blog.title}</h2>
              <img src={blog.imageUrl} alt="blog" width="200px" />
              <h4>
                category: <span>{blog.category}</span>
              </h4>
              <h4>{blog.author.username}</h4>
              <p>{blog.content}</p>
              <div>
                {token && blog.author._id === decoded.userId ? (
                  <>
                    {" "}
                    <button>Edit</button>
                    <button onClick={() => deleteBlog(blog._id)}>Delete</button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogsList;
