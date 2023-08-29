import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';

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

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT as HTTP-Only Cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});

// @desc     Register user
// @route    POST /api/users/register
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

// @desc     Logout user / clear cookie
// @route    POST /api/users/logout
// @access   Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user');
});

// @desc     Get User Profile
// @route    GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// @desc     Update User Profile
// @route    PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
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
