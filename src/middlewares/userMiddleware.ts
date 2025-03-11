import { Request, Response, NextFunction } from 'express';

const addUserToRequest = (req: Request, res: Response, next: NextFunction): void => {
  req.user = { _id: '67cfea6297557a5b134632e1' };
  next();
};

export default addUserToRequest;
