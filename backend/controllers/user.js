import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc     Auth user & get Token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // If User does not exists or Password is Wrong
  if (!user || !(await user.matchPasswords(password))) {
    res.status(401);
    throw new Error('Invalid Credentials');
  }

  generateToken(res, user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc     Register user
// @route    POST /api/users/register
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`User Already Exists`);
  }

  const user = await User.create({ name, email, password });

  if (!user) {
    res.status(500);
    throw new Error(`Some Internal Error`);
  }

  generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc     Logout user / clear cookie
// @route    POST /api/users/logout
// @access   Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: 'Logout Successfully' });
});

// @desc     Get User Profile
// @route    GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error(`User not Found`);
  }

  res.status(200).json({
    _id: user._id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
  });
});

// @desc     Update User Profile
// @route    PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      email: updateUser.email,
      name: updateUser.name,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error(`User not Found`);
  }
});

// @desc     Get All User Profile
// @route    GET /api/users/
// @access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get all user profiles by admin');
});

// @desc     Get a Specific User Profile
// @route    GET /api/users/:id
// @access   Private/Admin
const getUsersById = asyncHandler(async (req, res) => {
  res.send('get user profile by id by admin');
});

// @desc     Delete User Profile
// @route    DELETE /api/users/:id
// @access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user profile');
});

// @desc     Update User
// @route    PUT /api/users/:id
// @access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('delete user profile by admin');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersById,
  deleteUser,
  updateUser,
};
