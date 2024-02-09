const userRepo = require("../repositories/userRepository");

const getAllUsers = async (filters) => {
  try {
    const users = await userRepo.getAllUsers(filters);
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await userRepo.getUserById(id);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const createUser = async (user) => {
  try {
    // Check if user already exists
    const userExists = await userRepo.getAllUsers({ fullName: user.fullName });
    if (userExists.length > 0) {
      throw new Error("User already exists");
    }
    // Create user
    const newUser = await userRepo.createUser(user);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await userRepo.deleteUser(id);
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
