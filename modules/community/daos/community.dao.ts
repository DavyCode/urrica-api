/* eslint-disable no-octal */
import mongooseService from '../../../common/services/mongoose.services';
import debug from 'debug';
import uniqueValidator from 'mongoose-unique-validator';
import { CreateCommunityDto } from '../dto/create.community.dto';
import { PatchCommunityDto } from '../dto/patch.community.dto';
import { PutCommunityDto } from '../dto/put.community.dto';

import {
  MongooseObjectId,
  MongooseUpdateOptions,
} from '../../../common/types/mongoose.types';
import Utils from '../../../common/utils/utils';
import { CommunityType } from '../types/community.type';

const log: debug.IDebugger = debug('app:Community-dao');

class CommunityDao {
  Schema = mongooseService.getMongoose().Schema;

  communitySchema = new this.Schema({
    communityName: String,
    communityId: String,
    meta: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  });

  Community = mongooseService
    .getMongoose()
    .model('Community', this.communitySchema);

  constructor() {
    log('Created new instance of CommunityDao');

    this.communitySchema.plugin(uniqueValidator, {
      message: '{PATH} already exists!',
    });

    this.communitySchema.methods.toJSON = function () {
      const obj = this.toObject();

      delete obj.__v;
      return obj;
    };

    this.communitySchema.index({ '$**': 'text' });
  }

  /***********************
   *
   ****************************/

  /**
   * put
   * @param query
   * @param update
   * @param option
   * @returns CommunityDto
   */
  async put(
    query: any,
    update: any,
    option: MongooseUpdateOptions,
  ): Promise<boolean | CommunityType | any> {
    if (query._id) {
      if (!mongooseService.validMongooseObjectId(query._id)) {
        return Promise.resolve(false);
      }
    }
    return (await this.Community.findOneAndUpdate(
      query,
      {
        $set: update,
        'meta.updatedAt': Date.now(),
      },
      option,
    ).exec()) as CommunityType;
  }

  /**
   * getById
   * @param id
   * @returns CommunityDto
   * @public
   */
  async getById(id: string): Promise<boolean | CommunityType> {
    if (!mongooseService.validMongooseObjectId(id)) {
      return Promise.resolve(false);
    }
    return (await this.Community.findOne({ _id: id }).exec()) as CommunityType;
  }

  async findOne(query: any) {
    if (query._id) {
      if (!mongooseService.validMongooseObjectId(query._id)) {
        return Promise.resolve(false);
      }
    }
    return this.Community.findOne(query).exec();
  }

  async save(communityInstance: CommunityType) {
    return await communityInstance.save();
  }

  async find(query: any) {
    return await this.Community.find(query);
  }

  async create(items: CreateCommunityDto) {
    return await this.Community.create(items);
  }

  /**
   * counts the number of documents in the collection.
   * @returns number
   * @public
   */
  async getTotalCount() {
    return this.Community.estimatedDocumentCount().exec();
  }

  async getAll(query: any) {
    return this.Community.find(query).exec();
  }

  async findByIdOrName(query: { communityId: string; communityName: string }) {
    return this.Community.find({
      $or: [
        { communityId: query.communityId },
        { communityName: query.communityName },
      ],
    });
  }
}

export default new CommunityDao();
