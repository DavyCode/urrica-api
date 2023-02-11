import { query, Request, Response } from 'express';
import argon2 from 'argon2';
import debug from 'debug';
import usersService from '../services/user.services';
import {
  apiCreatedResponse,
  apiOKResponse,
} from '../../../common/utils/apiResponses';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
  /**
   * getAllUsers
   * @param req
   * @param res
   */
  async getAllUsers(req: Request, res: Response) {
    const { ...rest } = await usersService.getAll(req.query);
    const controllerRes = new apiOKResponse(rest);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async getUserById(req: Request, res: Response) {
    const user = await usersService.getById(req.params.userId);
    res.status(200).send({ status: 'success', data: user });
  }

  /**
   * getUser
   * @param req
   * @param res
   */
  async getUser(req: Request, res: Response): Promise<void> {
    const { ...rest } = await usersService.getById(req.params.userId);
    const controllerRes = new apiOKResponse(rest);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  /**
   * createUser
   * @param req
   * @param res
   */
  async createUser(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await usersService.create(req.body);
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  /**
   * updateUser
   * @param req
   * @param res
   */
  async updateUser(req: Request, res: Response) {
    const { message, ...rest } = await usersService.putById(
      req.params.userId,
      req.body,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  /**
   * patchUser
   * @param req
   * @param res
   */
  async patchUser(req: Request, res: Response) {
    const { message, ...rest } = await usersService.putById(
      req.params.userId,
      req.body,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  /**
   * verifyUserOtp
   * @param req
   * @param res
   */
  async verifyUserOtp(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await usersService.verifyUserOtp(
      req.params.otp,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  /**
   * getPasswordResetOtp
   * @param req
   * @param res
   */
  async getPasswordResetOtp(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await usersService.getPasswordResetOtp(
      req.params.email,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const { otp, password } = req.params;
    const { message, ...rest } = await usersService.resetPassword(
      otp,
      password,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { message, ...rest } = await usersService.changePassword(
      oldPassword,
      newPassword,
      confirmPassword,
      res.locals.jwt.userId,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }
}

export default new UsersController();
