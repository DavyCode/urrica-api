"use strict";
// import express from 'express';
// import jwt from 'jsonwebtoken';
// import usersService from '../../users/services/user.services';
// import { JWT_SECRET } from '../../../config/env';
// import { Jwt } from '../../../common/types/jwt';
// // @ts-expect-error
// const jwtSecret: string = JWT_SECRET;
// class JwtMiddleware {
//   validJWTNeeded(
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction,
//   ) {
//     if (req.headers['authorization']) {
//       try {
//         const authorization = req.headers['authorization'].split(' ');
//         if (authorization[0] !== 'Bearer') {
//           return res
//             .status(401)
//             .send({ status: 'error', error: 'Unauthorized' });
//         } else {
//           res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
//           next();
//         }
//       } catch (error) {
//         return res.status(403).send({
//           status: 'error',
//           error: 'Unauthorized! something went wrong',
//           message: error,
//         });
//       }
//     } else {
//       return res.status(401).send({
//         status: 'error',
//         error: 'Unauthorized! Authorization Header missing',
//       });
//     }
//   }
// }
// export default new JwtMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL2F1dGgvbWlkZGxld2FyZS9qd3QubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQWlDO0FBQ2pDLGtDQUFrQztBQUNsQyxpRUFBaUU7QUFDakUsb0RBQW9EO0FBQ3BELG1EQUFtRDtBQUVuRCxzQkFBc0I7QUFDdEIsd0NBQXdDO0FBRXhDLHdCQUF3QjtBQUN4QixvQkFBb0I7QUFDcEIsNEJBQTRCO0FBQzVCLDZCQUE2QjtBQUM3QixrQ0FBa0M7QUFDbEMsUUFBUTtBQUNSLDBDQUEwQztBQUMxQyxjQUFjO0FBQ2QseUVBQXlFO0FBQ3pFLCtDQUErQztBQUMvQyx1QkFBdUI7QUFDdkIsMkJBQTJCO0FBQzNCLGlFQUFpRTtBQUNqRSxtQkFBbUI7QUFDbkIsNkVBQTZFO0FBQzdFLG9CQUFvQjtBQUNwQixZQUFZO0FBQ1osMEJBQTBCO0FBQzFCLHdDQUF3QztBQUN4Qyw2QkFBNkI7QUFDN0IseURBQXlEO0FBQ3pELDRCQUE0QjtBQUM1QixjQUFjO0FBQ2QsVUFBVTtBQUNWLGVBQWU7QUFDZixzQ0FBc0M7QUFDdEMsMkJBQTJCO0FBQzNCLCtEQUErRDtBQUMvRCxZQUFZO0FBQ1osUUFBUTtBQUNSLE1BQU07QUFDTixJQUFJO0FBRUosc0NBQXNDIn0=