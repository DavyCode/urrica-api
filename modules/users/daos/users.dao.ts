/* eslint-disable no-octal */
import mongooseService from '../../../common/services/mongoose.services';
import debug from 'debug';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';

import {
  MongooseObjectId,
  MongooseUpdateOptions,
} from '../../../common/types/mongoose.types';
import Utils from '../../../common/utils/utils';
import { User } from '../types/user.type';

const log: debug.IDebugger = debug('app:users-dao');

class UsersDao {
  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema({
    // _id: String,
    id: String,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
      match: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
    },
    resetPasswordPin: { type: String },
    passwordHash: { type: String },
    verifyEmailOtp: { type: String },
    active: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    lock: { type: Boolean, default: false },
    role: {
      type: String,
      default: 'user',
      // enum: [...getObjectValues(rolesType)],
    },
    permissionLevel: { type: Number, default: 1 },
    googleToken: { type: String },
    googleSubUserId: { type: String },
    howDidYouHearAboutUs: { type: String },
    referral_code: { type: String },
    meta: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  });

  User = mongooseService.getMongoose().model('Users', this.userSchema);

  constructor() {
    log('Created new instance of UsersDao');

    this.userSchema.plugin(uniqueValidator, {
      message: '{PATH} already exists!',
    });

    this.userSchema.virtual('password').set(function (val) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(val, salt);
      this.passwordHash = hash;
    });

    this.userSchema.methods.comparePassword = function (
      candidatePassword: string,
    ) {
      return bcrypt.compareSync(candidatePassword, this.passwordHash);
    };

    this.userSchema.methods.toJSON = function () {
      const obj = this.toObject();

      delete obj.passwordHash;
      delete obj.googleToken;
      delete obj.__v;
      return obj;
    };

    this.userSchema.index({ '$**': 'text' });
  }

  /***********************
   *
   ****************************/

  /**
   * comparePasswords
   * @param userInstance
   * @param password
   * @returns
   */
  async comparePasswords(userInstance: any, password: string) {
    return bcrypt.compareSync(password, userInstance.passwordHash);
  }

  /**
   * hashPassword
   * @param password
   * @returns hash
   */
  async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  /**
   * addUser
   * @param userFields
   * @returns <CreateUserDto>
   * @public
   */
  async addUser(userFields: CreateUserDto) {
    const userId = Utils.generateUniqueId();
    const refcode = Utils.generateReferralCode();
    const verifyEmailOtp = Utils.RandomInteger().toString().substring(2, 9);

    const newUser = await this.User.create({
      id: userId,
      referral_code: refcode,
      verifyEmailOtp,
      ...userFields,
    });
    return newUser;
  }

  /**
   * getAllUsers
   * @returns UserDto[]
   * @public
   */
  async getAllUsers(query?: any) {
    const paginate = { skip: 0, limit: 10 };

    if (query && query.skip && query.limit) {
      paginate.skip = Number(query.skip);
      paginate.limit = Number(query.limit);
    }

    if (query.search) {
      const regex: any = new RegExp(
        Utils.escapeRegex(query?.search) as string,
        'gi',
      );

      const data = await this.User.find(
        { $text: { $search: regex } },
        { score: { $meta: 'textScore' } },
      )
        .sort({ 'meta.createdAt': -1, score: { $meta: 'textScore' } })
        .skip(paginate.skip)
        .limit(paginate.limit)
        .sort({ 'meta.createdAt': -1 })
        .select('-passwordHash')
        .exec();

      const totalDocumentCount = await this.User.countDocuments({
        $text: { $search: regex },
      });

      return Promise.resolve({
        data: data,
        totalDocumentCount,
        skip: paginate.skip,
        limit: paginate.limit,
        queryWith: query,
      });
    }

    const filterParams = { ...query };

    if (query.date) {
      filterParams['meta.createdAt'] = {
        $gte: new Date(new Date(query.date).setHours(0o0, 0o0, 0o0)),
        $lt: new Date(new Date(query.date).setHours(23, 59, 59)),
      };
    }

    if (query.startDate && query.endDate) {
      filterParams['meta.createdAt'] = {
        $gte: new Date(new Date(query.startDate).setHours(0o0, 0o0, 0o0)),
        $lt: new Date(new Date(query.endDate).setHours(23, 59, 59)),
      };
    }

    const { skip, limit, date, endDate, startDate, search, ...rest } =
      filterParams;

    const data = await this.User.find({ ...rest })
      .limit(paginate.limit)
      .skip(paginate.skip)
      .sort({ 'meta.createdAt': -1 })
      .select('-passwordHash')
      .exec();

    const totalDocumentCount = await this.User.countDocuments({
      ...rest,
    });

    return Promise.resolve({
      users: data,
      totalDocumentCount,
      skip: paginate.skip,
      limit: paginate.limit,
      queryWith: query,
    });
  }

  /**
   * putUserById
   * @param userId
   * @param userFields
   * @returns UserDto
   * @public
   */
  async putById(
    userId: string | MongooseObjectId,
    userFields: PutUserDto | PatchUserDto | any,
    option: MongooseUpdateOptions | null,
  ): Promise<boolean | User> {
    if (!mongooseService.validMongooseObjectId(userId)) {
      return Promise.resolve(false);
    }
    return (await this.User.findOneAndUpdate(
      { _id: userId },
      {
        $set: userFields,
        'meta.updatedAt': Date.now(),
      },
      option,
    )
      .select('-passwordHash')
      .exec()) as User;
  }

  /**
   * put
   * @param query
   * @param update
   * @param option
   * @returns UserDto
   */
  async put(
    query: any,
    update: any,
    option: MongooseUpdateOptions,
  ): Promise<boolean | User | any> {
    if (query._id) {
      if (!mongooseService.validMongooseObjectId(query._id)) {
        return Promise.resolve(false);
      }
    }
    return (await this.User.findOneAndUpdate(
      query,
      {
        $set: update,
        'meta.updatedAt': Date.now(),
      },
      option,
    )
      .select('-passwordHash')
      .exec()) as User;
  }

  /**
   * getUserById
   * @param userId
   * @returns UserDto
   * @public
   */
  async getUserById(userId: string): Promise<boolean | User> {
    if (!mongooseService.validMongooseObjectId(userId)) {
      return Promise.resolve(false);
    }
    return (await this.User.findOne({ _id: userId })
      .select('-passwordHash')
      .exec()) as User;
  }

  async findOne(query: any) {
    return this.User.findOne(query).exec();
  }

  async save(userInstance: User) {
    return await userInstance.save();
  }

  /**
   * counts the number of Users documents in the collection.
   * @returns number
   * @public
   */
  async getUserTotalCount() {
    return this.User.estimatedDocumentCount().exec();
  }
}

export default new UsersDao();
