import DomainError from './domain.error';
import { Errors } from '../constants/errors.constant';

export default class AuthenticationError extends DomainError {
  protected error_name = 'not_authenticated';

  protected httpCode = 401;

  public constructor(
    message: string = Errors.NOT_AUTHENTICATED,
    error: Error = undefined,
    data: any = null,
    success = false
  ) {
    super(message, error, data, success);
    Error.captureStackTrace(this, this.constructor);
  }
}
