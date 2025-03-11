import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next({ status: 404, message: 'Страница не найдена' });
};

export default notFoundHandler;
