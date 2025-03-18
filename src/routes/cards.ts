import { Router } from 'express';
import {
  getAllCards, createCard, deleteCard, addLike, deleteLike,
} from '../controllers/cards';
import {
  createCardSchema, deleteCardSchema, addLikeSchema, deleteLikeSchema,
} from '../validations/schemas';

const router = Router();

router.get('/cards', getAllCards); // Получение всех карточек
router.post('/cards', createCardSchema, createCard); // Создание карточки
router.delete('/cards/:cardId', deleteCardSchema, deleteCard); // Удаление карточки
router.put('/cards/:cardId/likes', addLikeSchema, addLike); // Добавление лайка
router.delete('/cards/:cardId/likes', deleteLikeSchema, deleteLike); // Удаление лайка

export default router;
