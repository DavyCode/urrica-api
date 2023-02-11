import mongooseService from '../../../common/services/mongoose.services';
import debug from 'debug';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { UserDto } from '../dto/user.dto';
import {
  MongooseObjectId,
  MomgooseUpdateOptions,
} from '../../../common/types/mongoose.types';
import Utils from '../../../common/utils/utils';

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

  async comparePasswords(userInstance: any, password: string) {
    // const isMatch = user.comparePassword(password);
    return bcrypt.compareSync(password, userInstance.passwordHash);
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
  async getAllUsers(limit = 25, page = 0) {
    return this.User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  /**
   * putUserById
   * @param userId
   * @param userFields
   * @returns UserDto
   * @public
   */
  async putUserById(
    userId: string | MongooseObjectId,
    userFields: PutUserDto | PatchUserDto | any,
    option: MomgooseUpdateOptions | null,
  ) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      option, // { new: true, upsert: false },
    ).exec();

    return existingUser;
  }

  /**
   * put
   * @param query
   * @param update
   * @param option
   * @returns UserDto
   */
  async put(query: any, update: any, option: MomgooseUpdateOptions) {
    const existingUser = await this.User.findOneAndUpdate(
      query,
      { $set: update },
      option,
    ).exec();

    return existingUser;
  }
  /**
   * getUserById
   * @param userId
   * @returns UserDto
   * @public
   */
  async getUserById(userId: string) {
    if (!mongooseService.validMongooseObjectId(userId)) {
      return Promise.resolve(false);
    }
    return await this.User.findOne({ _id: userId })
      .select('-passwordHash')
      .exec();
  }

  /**
   * getUserByEmailWithPassword
   * @param email
   * @returns UserDto
   * @public
   */
  async getUserByEmailWithPassword(email: string) {
    return this.User.findOne({ email }).select('_id email +password').exec();
  }

  async findOne(query: any) {
    return this.User.findOne(query).exec();
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
