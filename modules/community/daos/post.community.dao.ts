/* eslint-disable no-octal */
import mongooseService from '../../../common/services/mongoose.services';
import debug from 'debug';
import uniqueValidator from 'mongoose-unique-validator';
import { CreateCommunityDto } from '../dto/create.community.dto';
import { CreateCommunityPostDto } from '../dto/create.post.community.dto';

import {
  MongooseObjectId,
  MongooseUpdateOptions,
} from '../../../common/types/mongoose.types';
import Utils from '../../../common/utils/utils';
import { CommunityPostType } from '../types/post.community.type';

const log: debug.IDebugger = debug('app:community-post-dao');

class CommunityPostDao {
  Schema = mongooseService.getMongoose().Schema;

  postSchema = new this.Schema({
    community: {
      type: mongooseService.getMongoose().Schema.Types.ObjectId,
      ref: 'Community',
    },
    title: String,
    text: String,
    owner: {
      type: mongooseService.getMongoose().Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        ref: 'Comment',
        type: mongooseService.getMongoose().Schema.Types.ObjectId,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    upvotes: [
      {
        type: String,
      },
    ],
    downvotes: [
      {
        type: String,
      },
    ],
    isDagerous: { type: Boolean, default: false },
    isViewable: { type: Boolean, default: true },
    meta: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  });

  Post = mongooseService.getMongoose().model('Post', this.postSchema);

  constructor() {
    log('Created new instance of CommunityDao');

    this.postSchema.plugin(uniqueValidator, {
      message: '{PATH} already exists!',
    });

    this.postSchema.methods.toJSON = function () {
      const obj = this.toObject();

      delete obj.__v;
      return obj;
    };

    this.postSchema.index({ '$**': 'text' });
  }

  /***********************
   *
   ****************************/

  /**
   * put
   * @param query
   * @param update
   * @param option
   * @returns CommunityPostDto
   */
  async put(
    query: any,
    update: any,
    option: MongooseUpdateOptions,
  ): Promise<boolean | CommunityPostType | any> {
    if (query._id) {
      if (!mongooseService.validMongooseObjectId(query._id)) {
        return Promise.resolve(false);
      }
    }
    return (await this.Post.findOneAndUpdate(
      query,
      {
        $set: update,
        'meta.updatedAt': Date.now(),
      },
      option,
    ).exec()) as CommunityPostType;
  }

  /**
   * getById
   * @param id
   * @returns CommunityPostDto
   * @public
   */
  async getById(id: string): Promise<boolean | CommunityPostType> {
    if (!mongooseService.validMongooseObjectId(id)) {
      return Promise.resolve(false);
    }
    return (await this.Post.findOne({ _id: id }).exec()) as CommunityPostType;
  }

  /**
   * findOne
   * @param query
   * @returns
   */
  async findOne(query: any) {
    if (query._id) {
      if (!mongooseService.validMongooseObjectId(query._id)) {
        return Promise.resolve(false);
      }
    }
    return this.Post.findOne(query).exec();
  }

  async save(postInstance: CommunityPostType) {
    return await postInstance.save();
  }

  /**
   * find
   * @param query
   * @returns
   */
  async find(query: any) {
    return await this.Post.find(query);
  }

  /**
   * create
   * @param items
   * @returns
   */
  async create(items: CreateCommunityPostDto) {
    return await this.Post.create(items);
  }

  /**
   * delete
   * @param postId
   * @returns
   */
  async delete(postId: string) {
    if (postId) {
      if (!mongooseService.validMongooseObjectId(postId)) {
        return Promise.resolve(false);
      }
    }
    // return await this.Post.findByIdAndDelete({ _id: postId });
    return await this.Post.findByIdAndDelete(postId);
  }

  /**
   * counts the number of documents in the collection.
   * @returns number
   * @public
   */
  async getTotalCount() {
    return this.Post.estimatedDocumentCount().exec();
  }

  /**
   * getAll
   * @param query
   * @returns
   */
  async getAll(query?: any) {
    const paginate = { skip: 0, limit: 10 };

    if (query && query.skip && query.limit) {
      paginate.skip = Number(query.skip);
      paginate.limit = Number(query.limit);
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

    const data = await this.Post.find({ ...rest })
      .limit(paginate.limit)
      .skip(paginate.skip)
      .sort({ 'meta.createdAt': -1 })
      .exec();

    const totalDocumentCount = await this.Post.countDocuments({
      ...rest,
    });

    return Promise.resolve({
      posts: data,
      totalDocumentCount,
      skip: paginate.skip,
      limit: paginate.limit,
      queryWith: query,
    });
  }

  async findByIdAndAddtoList(
    postId: string,
    update: any,
    option: MongooseUpdateOptions,
  ) {
    if (!mongooseService.validMongooseObjectId(postId)) {
      return Promise.resolve(false);
    }

    if (update.userId) {
      if (!mongooseService.validMongooseObjectId(update.userId)) {
        return Promise.resolve(false);
      }
    }

    return (await this.Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: update,
        'meta.updatedAt': Date.now(),
      },
      option,
    ).exec()) as CommunityPostType;
  }

  async findByIdAndRemoveFromList(
    postId: string,
    update: any,
    option: MongooseUpdateOptions,
  ) {
    if (!mongooseService.validMongooseObjectId(postId)) {
      return Promise.resolve(false);
    }

    if (!mongooseService.validMongooseObjectId(update.userId)) {
      return Promise.resolve(false);
    }

    return (await this.Post.findOneAndUpdate(
      { _id: postId },
      {
        $pull: update,
        'meta.updatedAt': Date.now(),
      },
      option,
    ).exec()) as CommunityPostType;
  }

  async upvotePost(postId: string, userId: MongooseObjectId) {
    if (!mongooseService.validMongooseObjectId(postId)) {
      return Promise.resolve(false);
    }

    if (!mongooseService.validMongooseObjectId(userId)) {
      return Promise.resolve(false);
    }

    // remove from downvote list first
    // remove from upvote list to avoid duplicates
    await this.Post.findOneAndUpdate(
      { _id: postId },
      {
        $pull: {
          downvotes: userId,
          upvotes: userId,
        },
        'meta.updatedAt': Date.now(),
      },
      {
        upsert: true,
      },
    ).exec();

    // add to upvote list
    return (await this.Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          upvotes: userId,
        },
        'meta.updatedAt': Date.now(),
      },
      {
        upsert: true,
        new: true,
      },
    ).exec()) as CommunityPostType;
  }

  async downvotePost(postId: string, userId: MongooseObjectId) {
    // we need to remove from upvote list first
    if (!mongooseService.validMongooseObjectId(postId)) {
      return Promise.resolve(false);
    }

    if (!mongooseService.validMongooseObjectId(userId)) {
      return Promise.resolve(false);
    }

    // remove from upvote list first
    // remove from downvote list to avoid duplicates
    await this.Post.findOneAndUpdate(
      { _id: postId },
      {
        $pull: {
          downvotes: userId,
          upvotes: userId,
        },
        'meta.updatedAt': Date.now(),
      },
      {
        upsert: true,
      },
    ).exec();

    // add to downvote list
    return (await this.Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          downvotes: userId,
        },
        'meta.updatedAt': Date.now(),
      },
      {
        upsert: true,
        new: true,
      },
    ).exec()) as CommunityPostType;
  }
}

export default new CommunityPostDao();
