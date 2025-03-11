import { Request, Response, NextFunction } from 'express';
import 'express';

declare module 'express' {
  interface Request {
    user?: {
      _id: string;
    };
  }
}

export const addUserToRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    req.user = {    
      _id: '67cfea6297557a5b134632e1'
    };
    next();
  } catch (error) {
    next(error); 
  }
}; 