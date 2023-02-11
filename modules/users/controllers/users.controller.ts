import { Request, Response } from 'express';
import argon2 from 'argon2';
import debug from 'debug';
import usersService from '../services/user.services';
import {
  apiCreatedResponse,
  apiOKResponse,
} from '../../../common/utils/apiResponses';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
  async getAllUsers(req: Request, res: Response) {
    const users = await usersService.getAll(10, 0);
    res.status(200).send({ status: 'success', data: users });
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

  async put(req: Request, res: Response) {
    req.body.password = await argon2.hash(req.body.newPassword);
    const updatedUser = await usersService.putById(req.params.userId, req.body);
    res.status(200).send({ status: 'success', data: updatedUser });
  }

  async patchUser(req: Request, res: Response) {
    const updatedUser = await usersService.putById(req.params.userId, req.body);
    res.status(200).send({ status: 'success', data: updatedUser });
  }

  /**
   * verifyUserOtp
   * @param req
   * @param res
   */
  async verifyUserOtp(req: Request, res: Response): Promise<void> {
    const verifyEmailOtp = req.query.verifyEmailOtp as string;
    const { message, ...rest } = await usersService.verifyUserOtp(
      verifyEmailOtp,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }
}

export default new UsersController();
