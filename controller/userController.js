import User from "../models/User/user.model.js";
import jwt from "jsonwebtoken";

const createNewUser = async (req, res) => {
  const body = req.body;
  // console.log(body)
  if (!body || !body.name || !body.email || !body.password || !body.contact) {
    return res
      .status(400)
      .json({ status: "Error", message: "All fields required" });
  }
  const user = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
    contact: body.contact,
    role: `${body.role ? body.role : "USER"}`,
  });
  return res
    .status(200)
    .json({ status: "Success", message: "Create new User", user: user });
};

const loginUser = async (req, res) => {
  const body = req.body;
  // console.log(body)
  if (!body || !body.email || !body.password) {
    return res
      .status(400)
      .json({ status: "Error", message: "All field required" });
  }
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(400).json({ status: "Error", message: "Invalid User" });
  }
  const isMatched = user.comparePassword(body.password);
  if (!isMatched) {
    return res.status(400).json({ status: "Error", message: "Invalid User" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPIRE_DAY }
  );
  return res
    .status(200)
    .json({
      status: "success",
      message: "Login Successfully",
      token: token,
      userInfo: { id: user._id, name: user.name, role: user.role },
    });
};

export { createNewUser, loginUser };
