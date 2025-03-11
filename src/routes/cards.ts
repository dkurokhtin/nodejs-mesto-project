import { Router } from 'express';
import { getAllCards, createCard, deleteCard, addLike, deleteLike} from '../controllers/cards';

const router = Router();

router.get('/cards', getAllCards);      // Получение всех карточек
router.post('/cards', createCard);      // Создание карточки
router.delete('/cards/:cardId', deleteCard); // Удаление карточки   
router.put('/cards/:cardId/likes', addLike); // Добавление лайка
router.delete('/cards/:cardId/likes', deleteLike); // Удаление лайка
export default router;