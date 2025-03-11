
import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

const handleAuthError = (res: Response) => {
    return res.status(401).send({
    message: "Ошибка авторизации" 
  })

};

const extractBearerToken = (token: string) => { return token.replace('Bearer ', '')}

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;
  
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return handleAuthError(res);
  }

  (req as any).user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};