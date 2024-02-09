const User = require("../models/User");

const getAllUsers = async (filters) => {
  return await User.find(filters);
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const createUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();
  return newUser;
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
