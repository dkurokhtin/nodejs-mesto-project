import { Router } from 'express';
import {
  createUser, login,
} from '../controllers/user';

const router = Router();

router.post('/signup', createUser); // Регистрация пользователя
router.post('/signin', login); // Вход в систему

export default router;
