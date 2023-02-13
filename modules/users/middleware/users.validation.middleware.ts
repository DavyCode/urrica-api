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
        referredBy: Joi.string(),
      })
      .with('email', 'password');

    try {
      await schema.validateAsync(req.body);
      if (
        req.body.password == '00000000' ||
        req.body.password == 11111111 ||
        req.body.password == '11111111'
      ) {
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

  async otpValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object().keys({
      otp: Joi.string().min(4).max(10).pattern(new RegExp('^[0-9]')).required(),
    });

    try {
      await schema.validateAsync(req.params);
      return next();
    } catch (err: any) {
      return res.status(400).json({
        status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
        errors: [`${err.details[0].message}`],
      });
    }
  }

  async emailParamsValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });

    try {
      await schema.validateAsync(req.params);
      return next();
    } catch (err: any) {
      return res.status(400).json({
        status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
        errors: [`${err.details[0].message}`],
      });
    }
  }
  async emailValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });

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

  async passwordResetConfirmValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object().keys({
      otp: Joi.string().min(4).max(10).pattern(new RegExp('^[0-9]')).required(),
      password: Joi.string().min(8).required(),
    });

    try {
      await schema.validateAsync(req.params);
      return next();
    } catch (err: any) {
      return res.status(400).json({
        status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
        errors: [`${err.details[0].message}`],
      });
    }
  }

  async changePasswordValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object().keys({
      confirmPassword: Joi.string().min(8).required(),
      newPassword: Joi.string().min(8).required(),
      oldPassword: Joi.string().min(8).required(),
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
  async UpdateUserValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object().keys({
      firstName: Joi.string().min(2).required(),
      lastName: Joi.string().min(2).required(),
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
