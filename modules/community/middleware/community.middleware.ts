import express from 'express';
import debug from 'debug';
import communityService from '../services/community.services';
import userController from '../../community/controllers/community.controller';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../../../common/utils/errors';
import {} from '../../../common/constant/errorMessages';

const log: debug.IDebugger = debug('app:community-controller-middleware');

class CommunityMiddleware {}

export default new CommunityMiddleware();
