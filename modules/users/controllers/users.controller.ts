import express from 'express';
import argon2 from 'argon2';
import usersService from '../services/user.services';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
  async getAllUsers(req: express.Request, res: express.Response) {
    const users = await usersService.getAll(10, 0);
    res.status(200).send({ status: 'success', data: users });
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.getById(req.params.userId);
    res.status(200).send({ status: 'success', data: user });
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const user = await usersService.create(req.body);
    res.status(200).send({ status: 'success', data: user });
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.newPassword);
    const updatedUser = await usersService.putById(req.params.userId, req.body);
    res.status(200).send({ status: 'success', data: updatedUser });
  }
}

export default new UsersController();
