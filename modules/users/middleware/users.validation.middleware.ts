import express from 'express';
import Joi from 'joi';
import ServerResponseStatus from '../../../common/constant/ServerResponseStatus';
import { BadRequestError } from '../../../common/utils/errors';

class UsersValidationMiddleware {
  //create user validation
  async CreateUserValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object()
      .keys({
        password: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        howDidYouHearAboutUs: Joi.string().min(2).required(),
      })
      .with('email', 'password');

    try {
      await schema.validateAsync(req.body);
      if (
        req.body.password == '00000000' ||
        req.body.password == 11111111 ||
        req.body.password == '11111111'
      ) {
        // throw new Error('failed'); //BadRequestError('Kindly choose a stronger password');
        return res.status(ServerResponseStatus.BAD_REQUEST).json({
          status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
          errors: ['Kindly choose a stronger password'],
          statusCode: ServerResponseStatus.BAD_REQUEST,
        });
      }
      return next();
    } catch (err: any) {
      return res.status(400).json({
        status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
        errors: [`${err.details[0].message}`],
      });
    }
  }

  async verifyEmailOtpValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object().keys({
      verifyEmailOtp: Joi.string().min(4).max(10).required(),
    });

    try {
      await schema.validateAsync(req.query);
      return next();
    } catch (err: any) {
      return res.status(400).json({
        status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
        errors: [`${err.details[0].message}`],
      });
    }
  }

  async UpdateUserValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object().keys({
      confirmPassword: Joi.string().min(8).required(),
      newPassword: Joi.string().min(8).required(),
      password: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
    });

    try {
      await schema.validateAsync(req.body);
      if (req.body.newPassword != req.body.confirmPassword) {
        return res.status(400).send({
          status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
          errors: [
            `newPassword ${req.body.newPassword} and confirmPassword ${req.body.confirmPassword} do not match`,
          ],
        });
      }
      return next();
    } catch (err: any) {
      return res.status(400).json({
        status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
        errors: [`${err.details[0].message}`],
      });
    }
  }
}

export default new UsersValidationMiddleware();