import express from 'express';
import debug from 'debug';
import communityService from '../services/community.services';
import communityController from '../../community/controllers/community.controller';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../../../common/utils/errors';
import {} from '../../../common/constant/errorMessages';

const log: debug.IDebugger = debug('app:community-controller-middleware');

class CommunityMiddleware {
  async extractPostId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    req.body.postId = req.params.postId;
    next();
  }

  async extractCommentId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    req.body.commentId = req.params.commentId;
    next();
  }
}

export default new CommunityMiddleware();
