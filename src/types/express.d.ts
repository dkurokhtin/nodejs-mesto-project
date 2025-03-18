declare global {
  namespace Express {
    export interface Request {
      user: {
        _id: string;
      };
    }
  }
}
// to make the file a module and avoid the TypeScript error
export {};
