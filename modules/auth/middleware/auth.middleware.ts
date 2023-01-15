import express from 'express';
import usersService from '../../users/services/user.services';
import * as argon2 from 'argon2';

class AuthMiddleware {
  async verifyUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user: any = await usersService.getUserByEmailAndPassword(
      req.body.email,
    );

    if (user) {
      const passwordHash = user.password;

      if (await argon2.verify(passwordHash, req.body.password)) {
        return next();
      } else {
        res.status(400).send({
          status: 'error',
          errors: 'Password does not match user account',
        });
      }
    } else {
      res.status(400).send({
        status: 'error',
        errors: 'Invalid email and/or password, user not found',
      });
    }
  }
}

export default new AuthMiddleware();
