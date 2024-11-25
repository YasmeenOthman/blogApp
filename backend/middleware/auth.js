const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ msg: "Unauthorized user,Token not found" });
  }
  // Split and get the token
  let clientToken = authHeader.split(" ")[1];

  try {
    // Verify the token
    let decoded = jwt.verify(clientToken, process.env.SECRET_KEY);
    // console.log(decoded);
    if (!decoded) {
      return res.send({ msg: "Invalid token" });
    }
    // Attach the decoded token data to the request object
    req.user = decoded;
    // Call the next middleware
    next();
  } catch (error) {
    console.log("error", error);
    // Send an error response if the token verification fails
    return res.status(401).send({ msg: "Invalid token", error });
  }
}

module.exports = verifyToken;
