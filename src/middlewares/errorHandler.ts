import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/errors';

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Внутренняя ошибка сервера' } = err;
  res.status(status).json({ message });
  next(err);
};

export default errorHandler;
