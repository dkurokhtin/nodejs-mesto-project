import { Response, NextFunction } from 'express';
import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '../utils/constants';
import { UnauthorizedError } from '../errors/UnauthorizedError';

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: Request, res: Response, next: NextFunction) => {
  const { JWT_SECRET } = process.env;
  try {
    const authenticationToken = req.headers.authorization;
    if (!authenticationToken?.startsWith('Bearer ')) {
      throw new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED);
    }

    const token = extractBearerToken(authenticationToken);
    const payload = jwt.verify(token, String(JWT_SECRET)) as { _id: string };
    req.user = { ...req.user, _id: payload._id };

    next();
  } catch (err) {
    next(err);
  }
};
