import { STATUS_CODES } from '../utils/constants';

export class ConflictError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = STATUS_CODES.CONFLICT;
  }
}

export default ConflictError;
