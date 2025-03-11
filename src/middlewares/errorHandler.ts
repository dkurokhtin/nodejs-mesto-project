import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES, ERROR_MESSAGES } from '../utils/constants';

export const CastErrorHandler = (err: any, next: NextFunction) => {
  if (err.name === 'CastError') {
    next({ status: STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.BAD_REQUEST });
  } else {
    next({
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

export const errorHandler = (err: any, req: Request, res: Response) => {
  const { status = 500, message = 'Внутренняя ошибка сервера' } = err;
  res.status(status).json({ message });
};
