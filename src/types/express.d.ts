import * as express from 'express';

declare module 'express' {
 export interface Request extends express.Request {
    user?: {
      _id: string;
    };
  }
}
