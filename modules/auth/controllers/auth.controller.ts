import { Request, Response } from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION_MINUTES } from '../../../config/env';
import authService from '../services/auth.services';
import { apiOKResponse } from '../../../common/utils/apiResponses';

const log: debug.IDebugger = debug('app:auth-controller');

// @ts-expect-error
const jwtSecret: string = JWT_SECRET;
const tokenExpirationInSeconds = JWT_EXPIRATION_MINUTES;

class AuthController {
  // async createJWT(req: Request, res: Response) {
  //   try {
  //     const token = await jwt.sign(req.body, jwtSecret, {
  //       expiresIn: tokenExpirationInSeconds,
  //     });
  //     return res.status(201).send({
  //       status: 'success',
  //       data: { accessToken: token, user: req.body },
  //     });
  //   } catch (error) {
  //     log('createJWT error: %O', error);
  //     return res
  //       .status(500)
  //       .send({ status: 'error', message: 'Failed to generate Token' });
  //   }
  // }

  /**
   * authUser
   * @param req
   * @param res
   */
  async authUser(req: Request, res: Response) {
    const { ...rest } = await authService.login(
      req.body.email,
      req.body.password,
    );
    const controllerRes = new apiOKResponse(rest);
    res.status(controllerRes.statusCode).json(controllerRes);
  }
}

export default new AuthController();
