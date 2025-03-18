import { Router } from 'express';
import { notFoundHandler } from '../middlewares/notFoundHandler';
import authRoutes from './auth';
import usersRoutes from './users';
import cardsRoutes from './cards';

import authMiddleware from '../middlewares/auth';

const router = Router();
router.use('/', authRoutes);
router.use('/', authMiddleware, usersRoutes);
router.use('/', authMiddleware, cardsRoutes);
router.use(notFoundHandler);
export default router;
