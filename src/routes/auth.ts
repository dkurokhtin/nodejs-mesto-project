import { Router } from 'express';
import {
  signup, login,
} from '../controllers/user';

const router = Router();

router.post('/signup', signup); // Регистрация пользователя
router.post('/signin', login); // Вход в систему

export default router;
