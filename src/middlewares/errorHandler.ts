import { Request, Response, NextFunction } from 'express';
import type { ConflictError } from '../errors/ConflictError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, max-len
const errorHandler = (err: ConflictError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Внутренняя ошибка сервера' } = err;
  res.status(status).json({ message });
};

export default errorHandler;
