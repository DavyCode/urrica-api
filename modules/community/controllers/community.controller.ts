import { query, Request, Response } from 'express';
import debug from 'debug';
import communityService from '../services/community.services';
import {
  apiCreatedResponse,
  apiOKResponse,
} from '../../../common/utils/apiResponses';

const log: debug.IDebugger = debug('app:Community-controller');

class CommunityController {
  /**
   * getAllCommunities
   * @param req
   * @param res
   */
  async getAllCommunities(req: Request, res: Response) {
    const { ...rest } = await communityService.getAll(req.query);
    const controllerRes = new apiOKResponse(rest);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  /**
   * create
   * @param req
   * @param res
   */
  async create(req: Request, res: Response): Promise<void> {
    const { ...rest } = await communityService.create(req.body);
    const controllerRes = new apiOKResponse(rest);
    res.status(controllerRes.statusCode).send(controllerRes);
  }
}

export default new CommunityController();
