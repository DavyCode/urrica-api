import express from 'express';
import userService from '../services/user.services';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION_MINUTES } from '../../../config/env';
import * as argon2 from 'argon2';

const log: debug.IDebugger = debug('app:users-controller');

class UsersMiddleware {
  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await userService.getById(req.params.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({
        status: 'error',
        error: `User ${req.params.userId} not found`,
      });
    }
  }

  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) {
      res
        .status(400)
        .send({ status: 'error', error: `User email already exists` });
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
