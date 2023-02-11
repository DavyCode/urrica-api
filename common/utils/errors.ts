import winston from 'winston';
import APIError from './APIError';
import ServerResponseStatus from '../constant/ServerResponseStatus';
import { NODE_ENV } from '../../config/env';

export class UnauthorizedError extends APIError {
  constructor(message: string) {
    super(ServerResponseStatus.UNAUTHORIZED, message);
  }
}

export class BadRequestError extends APIError {
  constructor(message: string) {
    super(ServerResponseStatus.BAD_REQUEST, message);
  }
}

export class NotFoundError extends APIError {
  constructor(message: string) {
    super(ServerResponseStatus.NOT_FOUND, message || 'Not Found');
  }
}

export class ForbiddenError extends APIError {
  constructor(message: string) {
    super(ServerResponseStatus.FORBIDDEN, message);
  }
}

export class NotAcceptableError extends APIError {
  constructor(message: string) {
    super(ServerResponseStatus.NOT_ACCEPTABLE, message);
  }
}

export class InternalServerError extends APIError {
  constructor(message: string) {
    super(ServerResponseStatus.INTERNAL_SERVER_ERROR, message);
  }
}

export class PaymentRequiredError extends APIError {
  constructor(message: string) {
    super(ServerResponseStatus.PAYMENT_REQUIRED, message);
  }
}

export const errorHandler = (
  error: any,
  request: any,
  response: any,
  next: any,
) => {
  /**
   * log the error message, and meta object
   */
  console.log('888----', Object.keys(error), '---88888');
  let respondWith = {
    errors: [error.message ? error.message : 'Something went wrong'],
    statusCode: error.statusCode
      ? error.statusCode
      : ServerResponseStatus.INTERNAL_SERVER_ERROR,
    status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
  };
  console.log('888----', respondWith, '---88888');

  if (NODE_ENV === 'development' && !(error instanceof APIError)) {
    respondWith = Object.assign({}, respondWith, { stack: error.stack });
  }

  if (NODE_ENV === 'production' && !(error instanceof APIError)) {
    // Push to logger in production
    // Pubsub.emit('error', { respondWith, error })
  }

  if (NODE_ENV === 'development') {
    winston.error(error.message, error);
  }

  response
    .status(
      error.statusCode
        ? error.statusCode
        : ServerResponseStatus.INTERNAL_SERVER_ERROR,
    )
    .json(respondWith);
};
