/* eslint-disable no-octal */
import mongooseService from '../../../common/services/mongoose.services';
import debug from 'debug';
import uniqueValidator from 'mongoose-unique-validator';
import { CreateCommunityPostDto } from '../dto/create.post.community.dto';
import { CreateCommunityPostCommentDto } from '../dto/create.comment.community.dto';

import {
  MongooseObjectId,
  MongooseUpdateOptions,
} from '../../../common/types/mongoose.types';
import Utils from '../../../common/utils/utils';
import { CommunityPostCommentType } from '../types/comments.community.type';

const log: debug.IDebugger = debug('app:community-post-dao');

class CommunityPostCommentDao {
  Schema = mongooseService.getMongoose().Schema;

  postSchema = new this.Schema({
    communityId: String,
    text: String,
    post: [
      {
        ref: 'Post',
        type: mongooseService.getMongoose().Schema.Types.ObjectId,
      },
    ],
    comments: [
      {
        ref: 'Comment',
        type: mongooseService.getMongoose().Schema.Types.ObjectId,
      },
    ],
    isBaseComment: { type: Boolean, default: true },
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
  ): Promise<boolean | CommunityPostCommentType | any> {
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
    ).exec()) as CommunityPostCommentType;
  }

  /**
   * getById
   * @param id
   * @returns CommunityPostDto
   * @public
   */
  async getById(id: string): Promise<boolean | CommunityPostCommentType> {
    if (!mongooseService.validMongooseObjectId(id)) {
      return Promise.resolve(false);
    }
    return (await this.Post.findOne({
      _id: id,
    }).exec()) as CommunityPostCommentType;
  }

  async findOne(query: any) {
    if (query._id) {
      if (!mongooseService.validMongooseObjectId(query._id)) {
        return Promise.resolve(false);
      }
    }
    return this.Post.findOne(query).exec();
  }

  async save(postInstance: CommunityPostCommentType) {
    return await postInstance.save();
  }

  async find(query: any) {
    return await this.Post.find(query);
  }

  async create(items: CreateCommunityPostCommentDto) {
    return await this.Post.create(items);
  }

  /**
   * counts the number of documents in the collection.
   * @returns number
   * @public
   */
  async getTotalCount() {
    return this.Post.estimatedDocumentCount().exec();
  }

  async getAll(query: any) {
    return this.Post.find(query).exec();
  }
}

export default new CommunityPostCommentDao();
