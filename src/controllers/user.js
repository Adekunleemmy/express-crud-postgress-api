//standardize response functions for user routes
import {
  createUserRes,
  getAllUsersRes,
  getUserByIdRes,
  updateUserRes,
  deleteUserRes,
} from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await createUserRes(name, email);
    handleResponse(res, 201, "User created successfully", user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersRes();
    handleResponse(res, 200, "Users retrieved successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdRes(id);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User retrieved successfully", user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await updateUserRes(id, name, email);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }

    handleResponse(res, 200, "User updated successfully", user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await deleteUserRes(id);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User deleted successfully", user);
  } catch (err) {
    next(err);
  }
};
