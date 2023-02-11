import express from 'express';
import Joi from 'joi';
import ServerResponseStatus from '../../../common/constant/ServerResponseStatus';
import { BadRequestError } from '../../../common/utils/errors';

class AuthValidationMiddleware {
  async AuthUserValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object()
      .keys({
        password: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
      })
      .with('email', 'password');

    try {
      await schema.validateAsync(req.body);
      return next();
    } catch (err: any) {
      return res.status(400).json({
        status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
        errors: [`${err.details[0].message}`],
      });
    }
  }
}

export default new AuthValidationMiddleware();