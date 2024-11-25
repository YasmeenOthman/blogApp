const express = require("express");
const router = express.Router();

const {
  getAllBlogs,
  getBlogById,
  createAblog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.controller");
// CRUD operation / different routes

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/create", createAblog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
