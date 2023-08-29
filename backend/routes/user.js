import express from 'express';
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersById,
  deleteUser,
  updateUser,
} from '../controllers/user.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, admin, getUsers).post(registerUser);
router.post('/logout', protect, logoutUser);
router.post('/auth', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .get(protect, admin, getUsersById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
