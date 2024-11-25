const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// __________Register__________-
const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!email || !username || !password)
      return res.send({
        msg: "All information ,username,email,and password are required",
        status: false,
      });
    let oldUser = await User.findOne({ email });
    if (oldUser)
      return res.send({
        msg: "user already registered,please login or signup with new email",
        status: false,
      });
    let hashedPasswprd = await bcrypt.hash(password, +process.env.SALT_ROUND);
    await User.create({
      username,
      email,
      password: hashedPasswprd,
    });
    return res.send({ msg: "registered successfully", status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ msg: "internal server error", error, status: false });
  }
};

// ____________Login ____________
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        msg: "Both email,and password are required",
        status: false,
      });
    }
    let registeredUser = await User.findOne({ email });
    if (!registeredUser) {
      return res.send({
        msg: "user does not exist please sign up first",
        status: false,
      });
    }
    let isPasswordValid = await bcrypt.compare(
      password,
      registeredUser.password
    );
    if (!isPasswordValid) {
      return res.send({ msg: "Invalid or wrong password", status: false });
    }
    // token
    let payload = {
      userId: registeredUser._id,
      email: registeredUser.email,
    };
    let token = await jwt.sign(payload, process.env.SECRET_KEY);
    return res.send({ msg: "Login successfully ", token, status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "internal server error", error });
  }
};

module.exports = { register, login };
