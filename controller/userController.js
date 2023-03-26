const express = require('express');
const { sequelize, User } = require('../models');


const app = express();
app.use(express.json());

// Create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const newUser = await User.create({ firstName, lastName, email });

    return res.status(201).json({
      message: "user created",
      data: newUser,
    });

  } catch (err) {
    console.log("error " + err);
    return res.status(500).json(err)
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [] });

    return res.status(200).json({
      message: "Users retrieved",
      data: users,
    });

  } catch (err) {
    console.log("error " + err);
    return res.status(500).json(err);
  }
};

// Get a user by id
const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User retrieved",
      data: user,
    });

  } catch (err) {
    console.log("error " + err);
    return res.status(500).json(err);
  }
};

// Delete a user by id
const deleteUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const numRowsDeleted = await User.destroy({ where: { id } });

    if (numRowsDeleted !== 1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted",
    });

  } catch (err) {
    console.log("error " + err);
    return res.status(500).json(err);
  }
};

// Export functions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
};