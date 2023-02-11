import UsersDao from '../daos/users.dao';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../../../common/utils/errors';
import {
  emailErrors,
  userErrors,
} from '../../../common/constant/errorMessages';
import Pubsub from '../events/user.events';
import Utils from '../../../common/utils/utils';

class UsersService implements CRUD {
  /**
   * Create User
   * @param resource CreateUserDto
   * @returns
   */
  async create(resource: CreateUserDto) {
    // first check if user exit
    const user = await UsersDao.findOne({ email: resource.email });
    if (user && user.verified) {
      throw new ForbiddenError(emailErrors.emailTakenAndVerified);
    }

    if (user && !user.verified) {
      const updatedUser = await UsersDao.put(
        { _id: user._id },
        {
          verifyEmailOtp: Utils.RandomInteger().toString().substring(2, 9),
          'meta.updatedAt': Date.now(),
        },
        {
          new: true,
          upsert: false,
        },
      );
      // send verification email
      Pubsub.emit('user_signup_otp', {
        firstName: user.firstName,
        email: user.email,
        otp: updatedUser?.verifyEmailOtp,
      });
      return { message: 'Check your email for verification OTP' };
    }

    const newUser = await UsersDao.addUser({
      ...resource,
    });

    Pubsub.emit('welcome_to_urrica', {
      firstName: newUser.firstName,
      email: newUser?.email,
      otp: newUser?.verifyEmailOtp,
    });

    return { message: 'Check your email for verification OTP' };
  }

  /**
   * putById
   * @param id
   * @param resource
   * @returns
   */
  async putById(id: string, resource: PutUserDto): Promise<any> {
    return UsersDao.putUserById(id, resource, {
      new: true,
      upsert: false,
    });
  }

  async getById(id: string) {
    const user = await UsersDao.getUserById(id);
    if (!user) {
      throw new NotFoundError(`User ${id} not found`);
    }
    return {
      user,
    };
  }

  async getAll(limit: number, page: number) {
    return UsersDao.getAllUsers();
  }

  async getUserByEmail(email: string) {
    return UsersDao.findOne({ email });
  }

  async getUserByEmailWithPassword(email: string) {
    return UsersDao.getUserByEmailWithPassword(email);
  }

  async getUserTotalCount() {
    return UsersDao.getUserTotalCount();
  }

  /**
   * verifyUserOtp
   * @param {string} verifyEmailOtp
   * @returns {}
   */
  async verifyUserOtp(verifyEmailOtp: string) {
    const otpUser = await UsersDao.put(
      { verifyEmailOtp },
      {
        verified: true,
        active: true,
        verifyEmailOtp: null,
        'meta.updatedAt': Date.now(),
      },
      { new: true, upsert: false },
    );

    if (!otpUser) {
      throw new NotFoundError('Wrong verification OTP');
    }

    Pubsub.emit('user_signup_otp_confirmed', {
      email: otpUser.email,
      firstName: otpUser.firstName,
    });
    return { message: 'Email verified' };
  }
}

export default new UsersService();
