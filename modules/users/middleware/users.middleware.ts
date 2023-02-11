import express from 'express';
import debug from 'debug';
import usersService from '../services/user.services';
import userController from '../controllers/users.controller';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../../../common/utils/errors';
import {
  emailErrors,
  userErrors,
} from '../../../common/constant/errorMessages';

const log: debug.IDebugger = debug('app:users-controller-middleware');

class UsersMiddleware {
  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await usersService.getById(req.params.userId);
    if (user) {
      next();
    } else {
      throw new NotFoundError(userErrors.userIdNotFound);
    }
  }

  async validateSameEmailExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await usersService.getUserByEmail(req.body.email);
    if (user) {
      throw new NotFoundError(emailErrors.emailTaken);
    } else {
      next();
    }
  }

  async validateSameEmailAndVerified(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await usersService.getUserByEmail(req.body.email);
    if (user && user.verified) {
      throw new ForbiddenError(emailErrors.emailTakenAndVerified);
    } else {
      next();
    }
  }

  async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware();
