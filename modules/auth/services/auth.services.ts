import UsersDao from '../../users/daos/users.dao';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../../../common/utils/errors';
import {
  emailErrors,
  userErrors,
} from '../../../common/constant/errorMessages';
import Utils from '../../../common/utils/utils';
import JwtUtils from '../../../common/utils/Jwt.utils';
import { JWT_EXPIRATION_MINUTES, JWT_BEARER } from '../../../config/env';

class AuthService {
  async login(email: string, password: string) {
    const user: any = await UsersDao.findOne({ email });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isUserProfile = user.passwordHash ? user.passwordHash : undefined;
    if (!isUserProfile) {
      throw new ForbiddenError('User profile not found');
    }

    if (!user.verified) {
      throw new ForbiddenError('Email needs verification');
    }

    if (user.lock) {
      throw new ForbiddenError('Access denied, contact support');
    }

    const isPasswordMatch = await UsersDao.comparePasswords(user, password);
    if (!isPasswordMatch) {
      throw new BadRequestError('Wrong password or email');
    }

    const token = await JwtUtils.generateLoginToken(user);
    const { passwordHash, ...userData } = Utils.parseToJSON(user);
    return {
      user: userData,
      access_token: token,
      token_type: JWT_BEARER,
      expiresIn: JWT_EXPIRATION_MINUTES,
    };
  }
}

export default new AuthService();
