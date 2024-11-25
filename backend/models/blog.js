const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String },
  category: { type: String },
  content: String,
  imageUrl: String,
  // author: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
