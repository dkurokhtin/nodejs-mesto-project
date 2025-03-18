import { Router } from 'express';
import {
  createUser, login,
} from '../controllers/user';
import { signupSchema, signinSchema } from '../validations/schemas';

const router = Router();

router.post('/signup', signupSchema, createUser); // Регистрация пользователя
router.post('/signin', signinSchema, login); // Вход в систему

export default router;
