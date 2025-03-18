import { Router } from 'express';
import {
  getUserById, getAllUsers, updateUserProfile, updateUserAvatar, getCurrentUser,
} from '../controllers/user';
import { updateProfileSchema, updateAvatarSchema, getUserByIdSchema } from '../validations/schemas';

const router = Router();

router.get('/users/me', getCurrentUser); // Получение текущего пользователя
router.get('/users/:userId', getUserByIdSchema, getUserById); // Получение пользователя по ID
router.get('/users', getAllUsers); // Получение всех пользователей

router.patch('/users/me', updateProfileSchema, updateUserProfile); // Обновление профиля пользователя
router.patch('/users/me/avatar', updateAvatarSchema, updateUserAvatar); // Обновление аватара пользователя

export default router;
