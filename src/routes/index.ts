import { Router } from 'express';
import usersRoutes from './user';  
import cardsRoutes from './cards';
const router = Router();


router.use('/', usersRoutes);  

router.use('/', cardsRoutes);

export default router;