const Blog = require("../models/blog");

const getAllBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find({}).populate("author");
    return res.send(blogs);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal server error ", error });
  }
};

const getBlogById = async (req, res) => {
  try {
    let blog = await Blog.findOne({ _id: req.params.id });
    return res.send(blog);
  } catch (error) {
    return res.status(500).send({ msg: "Internal server error ", error });
  }
};
const createAblog = async (req, res) => {
  try {
    let newBlog = req.body;
    let blog = await Blog.create(newBlog);
    return res.send({ msg: "Blog is been created successfully", blog });
  } catch (error) {
    return res.status(500).send({ msg: "Internal server error ", error });
  }
};
const updateBlog = async (req, res) => {
  try {
    let newVlaue = req.body;
    let id = req.params.id;
    let isBlogFound = await Blog.findOne({ _id: id });
    if (!isBlogFound) return res.send({ msg: "Blog Not Found" });
    let updatedBlog = await Blog.findByIdAndUpdate(id, newVlaue, { new: true });
    return res.send({ msg: "updated successfully", updatedBlog });
  } catch (error) {
    return res.status(500).send({ msg: "Internal server error ", error });
  }
};
const deleteBlog = async (req, res) => {
  try {
    let id = req.params.id;
    let isBlogFound = await Blog.findOne({ _id: id });
    if (!isBlogFound) return res.send({ msg: "Blog Not Found" });
    let deletedBlog = await Blog.findByIdAndDelete(id, { new: true });
    return res.send({ msg: "deleted successfully", deletedBlog });
  } catch (error) {
    return res.status(500).send({ msg: "Internal server error ", error });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createAblog,
  updateBlog,
  deleteBlog,
};
