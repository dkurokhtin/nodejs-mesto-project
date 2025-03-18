import { STATUS_CODES } from '../utils/constants';

export class UnauthorizedError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = STATUS_CODES.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
