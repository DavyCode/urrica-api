import ServerResponseStatus from '../constant/ServerResponseStatus';

class APIResponse {
  statusCode: number;
  message: string;
  status: string;
  data: Record<string, unknown>;

  constructor(statusCode = 200, message = `Successful`, data = {}) {
    this.statusCode = statusCode;
    this.status = ServerResponseStatus.RESPONSE_STATUS_SUCCESS;
    this.message = message;
    this.data = data;
  }
}

export { APIResponse as default };
