import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/NotFoundError';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Страница не найдена'));
};

export default notFoundHandler;
