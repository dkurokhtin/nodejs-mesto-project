import * as express from 'express';

declare global {
    // eslint-disable-next-line no-unused-vars
    interface CustomRequest extends express.Request{
      user?: {
        _id: string;
      };
    }

}

export {};
