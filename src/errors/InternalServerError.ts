import { STATUS_CODES } from '../utils/constants';

export class InternalServerError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
  }
}

export default InternalServerError;
