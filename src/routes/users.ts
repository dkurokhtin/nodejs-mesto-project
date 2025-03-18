import { Router } from 'express';
import {
  getUserById, getAllUsers, createUser, updateUserProfile, updateUserAvatar, getCurrentUser,
} from '../controllers/user';

const router = Router();

router.get('/users/me', getCurrentUser); // Получение текущего пользователя

router.get('/users/:userId', getUserById); // Получение пользователя по ID
router.get('/users', getAllUsers); // Получение всех пользователей

router.post('/users', createUser); // Создание пользователя

router.patch('/users/me', updateUserProfile); // Обновление профиля пользователя

router.patch('/users/me/avatar', updateUserAvatar); // Обновление аватара пользователя

export default router;
