import APIResponse from './APIResponse';
import ServerResponseStatus from '../constant/ServerResponseStatus';

export class apiOKResponse extends APIResponse {
  constructor(data?: Record<string, unknown>, message?: string) {
    super(ServerResponseStatus.OK, message, data);
  }
}

export class apiCreatedResponse extends APIResponse {
  constructor(message?: string, data?: Record<string, unknown>) {
    super(ServerResponseStatus.CREATED, message, data);
  }
}
