import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import usersService from '../../users/services/user.services';
import { JWT_SECRET } from '../../../config/env'
import { Jwt } from '../../../common/types/jwt'

// @ts-expect-error
const jwtSecret: string = JWT_SECRET;

class JwtMiddleware {

  validJWTNeeded(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send({ status: 'error', error: 'Unauthorized'});
        } else {
          res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
          next();
        }
      } catch (error) {
        return res.status(403).send({ status: 'error', error: 'Unauthorized! something went wrong', message: error });
      }
    } else {
      return res.status(401).send({ status: 'error', error: 'Unauthorized! Authorization Header missing'});
    }
  }
}

export default new JwtMiddleware();
