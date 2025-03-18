import { STATUS_CODES } from '../utils/constants';

export class NotFoundError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = STATUS_CODES.NOT_FOUND;
  }
}

export default NotFoundError;
