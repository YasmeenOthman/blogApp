const express = require("express");
const cors = require("cors");
const connection = require("./config/connection");
const blogRoutes = require("./routes/blog.routes");
const userRoutes = require("./routes/user.routes");
// initialize the app
const app = express();
const port = 8000;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`The serevr is start  listening on port ${port}`);
});
