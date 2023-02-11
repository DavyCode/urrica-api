import httpStatus from 'http-status';

const ServerResponseStatus = {
  RESPONSE_STATUS_FAILURE: 'failure',
  RESPONSE_STATUS_SUCCESS: 'success',
  OK: httpStatus.OK,
  CREATED: httpStatus.CREATED,
  INTERNAL_SERVER_ERROR: httpStatus.INTERNAL_SERVER_ERROR,
  NOT_FOUND: httpStatus.NOT_FOUND,
  FAILED: httpStatus.BAD_REQUEST,
  BAD_REQUEST: httpStatus.BAD_REQUEST,
  UNAUTHORIZED: httpStatus.UNAUTHORIZED,
  FORBIDDEN: httpStatus.FORBIDDEN,
  NOT_ACCEPTABLE: httpStatus.NOT_ACCEPTABLE,
  PAYMENT_REQUIRED: httpStatus.PAYMENT_REQUIRED,
};

export default ServerResponseStatus;