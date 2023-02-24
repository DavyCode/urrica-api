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
      communityName: Joi.string().min(4).required(),
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
