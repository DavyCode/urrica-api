import UsersDao from '../daos/users.dao';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { User } from '../types/user.type';
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
import { MongooseObjectId } from '../../../common/types/mongoose.types';

class UsersService implements CRUD {
  /**
   * Create User
   * @param resource CreateUserDto
   * @returns
   */
  async create(resource: CreateUserDto) {
    // first check if user exist
    const user = await UsersDao.findOne({ email: resource.email });
    if (user && user.verified) {
      throw new ForbiddenError(emailErrors.emailTakenAndVerified);
    }

    if (user && !user.verified) {
      const updatedUser = await UsersDao.put(
        { _id: user._id },
        {
          verifyEmailOtp: Utils.RandomInteger().toString().substring(2, 8),
          'meta.updatedAt': Date.now(),
        },
        {
          new: true,
          upsert: false,
        },
      );
      // send verification email
      Pubsub.emit('user_signup_otp', {
        firstName: updatedUser?.firstName,
        email: updatedUser?.email,
        otp: updatedUser?.verifyEmailOtp,
      });
      return { message: 'Check your email for verification OTP' };
    }

    const { referredBy, ...rest } = resource;
    let referrer: MongooseObjectId | undefined = undefined;
    if (referredBy) {
      const refUser = await UsersDao.findOne({ referredBy });
      if (refUser) {
        referrer = refUser._id;
      }
    }
    const newUser = await UsersDao.addUser({
      referredBy: referrer,
      ...rest,
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
    const user = await UsersDao.putById(id, resource, {
      new: true,
      upsert: false,
    });

    if (!user) {
      throw new NotFoundError(`User ${id} not found`); //TODO: don't send user ID to frontend
    }

    return { user, message: 'Update successful' };
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

  async getAll(query?: any) {
    return UsersDao.getAllUsers(query);
  }

  async getUserByEmail(email: string) {
    return UsersDao.findOne({ email });
  }

  async getUserTotalCount() {
    return UsersDao.getUserTotalCount();
  }

  /**
   * verifyUserOtp
   * @param {string} verifyEmailOtp
   * @returns {}
   */
  async verifyUserOtp(otp: string) {
    if (!otp) {
      throw new BadRequestError('OTP required!');
    }
    const otpUser = await UsersDao.put(
      { verifyEmailOtp: otp },
      {
        verified: true,
        active: true,
        verifyEmailOtp: '',
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

  /**
   *
   * @param email
   * @returns
   */
  async getVerifyUserOtp(email: string) {
    const user = await UsersDao.findOne({ email });
    if (!user) throw new NotFoundError(`User does not exist`);

    if (user && user.verified) {
      throw new ForbiddenError(emailErrors.emailTakenAndVerified);
    }

    const updatedUser = await UsersDao.put(
      { _id: user._id },
      {
        verifyEmailOtp: Utils.RandomInteger().toString().substring(2, 8),
        'meta.updatedAt': Date.now(),
      },
      {
        new: true,
        upsert: false,
      },
    );
    // send verification email
    Pubsub.emit('user_signup_otp', {
      firstName: updatedUser?.firstName,
      email: updatedUser?.email,
      otp: updatedUser?.verifyEmailOtp,
    });
    return { message: 'Check your email for verification OTP' };
  }

  /**
   * getPasswordResetOtp
   * @param email
   * @returns
   */
  async getPasswordResetOtp(email: string) {
    if (!email) {
      throw new BadRequestError('OTP required!');
    }

    const otpUser = await UsersDao.put(
      { email },
      {
        verified: true,
        active: true,
        resetPasswordPin: Utils.RandomInteger().toString().substring(2, 8),
        'meta.updatedAt': Date.now(),
      },
      { new: true, upsert: false },
    );

    if (!otpUser) {
      throw new NotFoundError('User not found');
    }

    Pubsub.emit('reset_password_otp', {
      email: otpUser.email,
      firstName: otpUser.firstName,
      otp: otpUser?.resetPasswordPin,
    });

    return { message: 'Check your email for reset OTP' };
  }

  /**
   * resetPassword
   * @param otp
   * @param password
   * @returns
   */
  async resetPassword(otp: string, password: string) {
    if (!otp || !password) {
      throw new BadRequestError('OTP and new password required!');
    }

    const passwordHash = await UsersDao.hashPassword(password);
    const user = await UsersDao.put(
      { resetPasswordPin: otp },
      {
        passwordHash,
        resetPasswordPin: '',
        'meta.updatedAt': Date.now(),
      },
      { new: true, upsert: false },
    );

    if (!user) {
      throw new NotFoundError('Wrong OTP');
    }

    Pubsub.emit('password_reset_success', {
      email: user.email,
      firstName: user.firstName,
    });

    return { message: 'Good to go', user };
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    userId: string,
  ) {
    const user: any = await UsersDao.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isPasswordMatch = await UsersDao.comparePasswords(user, oldPassword);
    if (!isPasswordMatch) {
      throw new BadRequestError('Wrong password');
    }

    if (confirmPassword !== newPassword) {
      throw new BadRequestError("Password don't match");
    }

    user.passwordHash = await UsersDao.hashPassword(newPassword);
    user.meta.updatedAt = Date.now();
    await UsersDao.save(user);
    const { passwordHash, ...userData } = Utils.parseToJSON(user);

    return {
      user: userData,
      message: 'Password change successful',
    };
  }
}

export default new UsersService();
