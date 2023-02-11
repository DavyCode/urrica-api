import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { UserDto } from '../../modules/users/dto/user.dto';
import { JWT_SECRET, JWT_EXPIRATION_MINUTES } from '../../config/env';
import { JWT_ } from '../types/jwt';
import { InternalServerError } from '../utils/errors';

// @ts-expect-error
const jwtSecret: string = JWT_SECRET;
const tokenExpirationInSeconds = JWT_EXPIRATION_MINUTES;

class JwtUtils {
  /**
   * generateLoginToken
   * @param user
   * @returns {string} token
   */
  async generateLoginToken(user: UserDto): Promise<string> {
    try {
      const token = await jwt.sign(
        {
          id: user.id,
          role: user.role,
          userId: user._id,
          iat: Date.now(),
        },
        jwtSecret,
        { expiresIn: tokenExpirationInSeconds }, // '1hr'
      );
      return token;
    } catch (e: any) {
      throw new InternalServerError(e);
    }
  }

  /**
   * generateRefreshToken
   * @param user
   * @returns {} refreshKey hash
   */
  async generateRefreshToken(user: UserDto) {
    // TODO:
    const refreshId = user.id + jwtSecret;
    const salt = crypto.createSecretKey(crypto.randomBytes(16));
    const hash = crypto
      .createHmac('sha512', salt)
      .update(refreshId)
      .digest('base64');
    const refreshKey = salt.export();

    return { refreshKey, hash };
  }

  /**
   * verifyToken
   * @param accessToken
   * @returns
   */
  async verifyToken(accessToken: string) {
    const token = accessToken.split(' ')[1];
    if (token) {
      try {
        const decode = (await jwt.verify(token, jwtSecret)) as JWT_;
        return decode;
      } catch (err) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
}

export default new JwtUtils();
