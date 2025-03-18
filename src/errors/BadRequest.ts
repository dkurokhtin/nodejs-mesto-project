import { STATUS_CODES } from '../utils/constants';

export class BadRequestError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = STATUS_CODES.BAD_REQUEST;
  }
}

export default BadRequestError;
