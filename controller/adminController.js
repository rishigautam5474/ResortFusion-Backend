import User from "../models/user.model.js";

const getAllUserDetails = async (req, res) => {
  const user = await User.find();
  if (!user) {
    res.status(400).json({ status: "Error", message: "Not found user" });
  }
  return res.status(200).json({ status: "success", message: user });
};

const getUserDetails = async (req, res) => {
  const { id } = req?.params;
  //   console.log(id,"++++++++")
  const user = await User.findById(id);
  if (!user) {
    res.status(400).json({ status: "Error", message: "Not found user" });
  }
  return res.status(200).json({ status: "success", message: user });
};

const updateUserDetails = async (req, res) => {
  const { id } = req?.params;
  const body = req?.body;
  //   console.log(id,"++++++++")
  const user = await User.findByIdAndUpdate(id, {
    name: body.name,
    email: body.email,
    password: body.password,
    contact: body.contact,
    // role: `${body.role ? body.role : "USER"}`,
  });
  if (!user) {
    res.status(400).json({ status: "Error", message: "Not found user" });
  }

  return res.status(200).json({ status: "success", message: "Update User", userId: id });
};

const deleteUser = async (req, res, next) => {
  const { id } = req?.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res.status(400).json({ status: "Error", message: "Not found user" });
  }
  return res.status(200).json({ status: "success", message: "Delete User" });
};

export { getAllUserDetails, getUserDetails, updateUserDetails, deleteUser };
