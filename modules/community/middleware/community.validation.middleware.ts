import express from 'express';
import Joi from 'joi';
import ServerResponseStatus from '../../../common/constant/ServerResponseStatus';
import { BadRequestError } from '../../../common/utils/errors';

class CommunityValidationMiddleware {
  async CreateCommunityValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const schema = Joi.object().keys({
      // password: Joi.string().min(8).required(),
      // email: Joi.string().email().required(),
      // firstName: Joi.string().min(2).required(),
      // lastName: Joi.string().min(2).required(),
      // howDidYouHearAboutUs: Joi.string().min(2).required(),
      // referredBy: Joi.string(),
    });

    try {
      await schema.validateAsync(req.body);
      return next();
    } catch (err: any) {
      return res.status(400).json({
        status: ServerResponseStatus.RESPONSE_STATUS_FAILURE,
        errors: [`${err.details[0].message}`],
        statusCode: ServerResponseStatus.BAD_REQUEST,
      });
    }
  }
}

export default new CommunityValidationMiddleware();
