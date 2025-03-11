import { Router } from 'express';
import usersRoutes from './user';
import cardsRoutes from './cards';
import { notFoundHandler } from '../middlewares/notFoundHandler';

const router = Router();

router.use('/', usersRoutes);
router.use('/', cardsRoutes);
router.use(notFoundHandler);

export default router;
