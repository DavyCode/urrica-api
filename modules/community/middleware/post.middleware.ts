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

const log: debug.IDebugger = debug('app:community-post-controller-middleware');

class PostMiddleware {}

export default new PostMiddleware();
