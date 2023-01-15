import mongooseService from '../../../common/services/mongoose.services';
import shortid from 'shortid';
import debug from 'debug';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { UserDto } from '../dto/user.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
  Schema = mongooseService.getMongoose().Schema;

  /**
   * USER SCHEMA
   */
  userSchema = new this.Schema({
    _id: String,
    email: String,
    password: { type: String, select: false },
  });
  User = mongooseService.getMongoose().model('Users', this.userSchema);

  constructor() {
    log('Created new instance of UsersDao');
  }

  /***********************
   *
   ****************************/

  /**
   * addUser
   * @param userFields
   * @returns <CreateUserDto>
   * @public
   */
  async addUser(userFields: CreateUserDto) {
    const userId = shortid.generate();
    const user = new this.User({
      _id: userId,
      ...userFields,
    });

    const newUser = await user.save();
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
  async putUserById(userId: string, userFields: PutUserDto | PatchUserDto) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true },
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
    return this.User.findOne({ _id: userId }).populate('User').exec();
  }

  /**
   * getUserByEmail
   * @param email
   * @returns UserDto
   * @public
   */
  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  /**
   * getUserByEmailAndPassword
   * @param email
   * @returns UserDto
   * @public
   */
  async getUserByEmailAndPassword(email: string) {
    return this.User.findOne({ email: email })
      .select('_id email +password')
      .exec();
  }
}

export default new UsersDao();
