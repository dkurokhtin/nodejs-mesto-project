import { STATUS_CODES } from '../utils/constants';

export class ForbiddenError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = STATUS_CODES.FORBIDDEN;
  }
}

export default ForbiddenError;
