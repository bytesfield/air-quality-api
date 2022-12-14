import DomainError from './domain.error';
import { Errors } from '../constants/errors.constant';

export default class InternalServerError extends DomainError {
  protected error_name = 'server_error';

  protected httpCode = 500;

  public constructor(message: string = Errors.SERVER_ERROR, error: Error = undefined, data: any = null, success = false) {
    super(message, error, data, success);
    Error.captureStackTrace(this, this.constructor);
  }
}
