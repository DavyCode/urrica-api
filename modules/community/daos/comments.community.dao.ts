/* eslint-disable no-octal */
import mongooseService from '../../../common/services/mongoose.services';
import debug from 'debug';
import uniqueValidator from 'mongoose-unique-validator';
import { CreateCommunityPostDto } from '../dto/create.post.community.dto';
import {
  CreateCommunityPostCommentDto,
  CreateCommunityCommentsCommentDto,
} from '../dto/create.comment.community.dto';

import {
  MongooseObjectId,
  MongooseUpdateOptions,
} from '../../../common/types/mongoose.types';
import Utils from '../../../common/utils/utils';
import { CommunityPostCommentType } from '../types/comments.community.type';

const log: debug.IDebugger = debug('app:community-post-comment-dao');

class CommunityPostCommentDao {
  Schema = mongooseService.getMongoose().Schema;

  postSchema = new this.Schema({
    community: {
      ref: 'Community',
      type: mongooseService.getMongoose().Schema.Types.ObjectId,
    },
    text: String,
    owner: {
      type: mongooseService.getMongoose().Schema.Types.ObjectId,
      ref: 'Users',
    },
    post: {
      ref: 'Post',
      type: mongooseService.getMongoose().Schema.Types.ObjectId,
    },
    comments: [
      {
        ref: 'Comment',
        type: mongooseService.getMongoose().Schema.Types.ObjectId,
      },
    ],
    baseComment: {
      ref: 'Comment',
      type: mongooseService.getMongoose().Schema.Types.ObjectId,
    },
    isBaseComment: { type: Boolean },
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

  Comment = mongooseService.getMongoose().model('Comment', this.postSchema);

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
    return (await this.Comment.findOneAndUpdate(
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
    return (await this.Comment.findOne({
      _id: id,
    }).exec()) as CommunityPostCommentType;
  }

  async findOne(query: any) {
    if (query._id) {
      if (!mongooseService.validMongooseObjectId(query._id)) {
        return Promise.resolve(false);
      }
    }
    return this.Comment.findOne(query)
      .populate('owner', 'profileImage firstName lastName')
      .exec();
  }

  async save(postInstance: CommunityPostCommentType) {
    return await postInstance.save();
  }

  async find(query: any) {
    return await this.Comment.find(query);
  }

  async create(
    items: CreateCommunityPostCommentDto | CreateCommunityCommentsCommentDto,
  ) {
    return await this.Comment.create(items);
  }

  /**
   * counts the number of documents in the collection.
   * @returns number
   * @public
   */
  async getTotalCount() {
    return this.Comment.estimatedDocumentCount().exec();
  }

  async getAll(query?: any) {
    return this.Comment.find(query).exec();
  }

  async deleteManyByPost(commentId: string) {
    this.Comment.deleteMany({ post: commentId }).exec();
  }

  async upvoteComment(commentId: string, userId: MongooseObjectId) {
    if (!mongooseService.validMongooseObjectId(commentId)) {
      return Promise.resolve(false);
    }

    if (!mongooseService.validMongooseObjectId(userId)) {
      return Promise.resolve(false);
    }

    // remove from downvote list first
    // remove from upvote list to avoid duplicates
    await this.Comment.findOneAndUpdate(
      { _id: commentId },
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
    return (await this.Comment.findOneAndUpdate(
      { _id: commentId },
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
    ).exec()) as CommunityPostCommentType;
  }

  async downvoteComment(commentId: string, userId: MongooseObjectId) {
    // we need to remove from upvote list first
    if (!mongooseService.validMongooseObjectId(commentId)) {
      return Promise.resolve(false);
    }

    if (!mongooseService.validMongooseObjectId(userId)) {
      return Promise.resolve(false);
    }

    // remove from upvote list first
    // remove from downvote list to avoid duplicates
    await this.Comment.findOneAndUpdate(
      { _id: commentId },
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
    return (await this.Comment.findOneAndUpdate(
      { _id: commentId },
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
    ).exec()) as CommunityPostCommentType;
  }

  async findByIdAndAddtoList(
    commentId: string,
    update: any,
    option: MongooseUpdateOptions,
  ) {
    if (!mongooseService.validMongooseObjectId(commentId)) {
      return Promise.resolve(false);
    }

    if (update.userId) {
      if (!mongooseService.validMongooseObjectId(update.userId)) {
        return Promise.resolve(false);
      }
    }

    return (await this.Comment.findOneAndUpdate(
      { _id: commentId },
      {
        $push: update,
        'meta.updatedAt': Date.now(),
      },
      option,
    ).exec()) as CommunityPostCommentType;
  }

  async findByIdAndRemoveFromList(
    commentId: string,
    update: any,
    option: MongooseUpdateOptions,
  ) {
    if (!mongooseService.validMongooseObjectId(commentId)) {
      return Promise.resolve(false);
    }

    if (update.userId) {
      if (!mongooseService.validMongooseObjectId(update.userId)) {
        return Promise.resolve(false);
      }
    }

    return (await this.Comment.findOneAndUpdate(
      { _id: commentId },
      {
        $pull: update,
        'meta.updatedAt': Date.now(),
      },
      option,
    ).exec()) as CommunityPostCommentType;
  }

  async getAllCommentOfAPost(postId: string, query?: any) {
    if (!mongooseService.validMongooseObjectId(postId)) {
      return Promise.resolve(false);
    }

    const paginate = { skip: 0, limit: 30 };

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

    const data = await this.Comment.find({
      post: postId,
      isBaseComment: true,
      ...rest,
    })
      .populate('owner', 'profileImage firstName lastName')
      .limit(paginate.limit)
      .skip(paginate.skip)
      .sort({ 'meta.createdAt': -1 })
      .exec();

    const finals = [];

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const { comments, upvotes, downvotes, ...rest } = Utils.parseToJSON(
          data[i],
        );

        finals.push({
          ...rest,
          commentsCount: comments.length,
          upvotesCount: upvotes.length,
          downvotesCount: downvotes.length,
        });
      }
    }

    const totalDocumentCount = await this.Comment.countDocuments({
      post: postId,
      isBaseComment: true,
      ...rest,
    });

    return Promise.resolve({
      comments: finals,
      totalDocumentCount,
      skip: paginate.skip,
      limit: paginate.limit,
      queryWith: query,
    });
  }

  async getAllCommentOfAComment(commentId: string, query?: any) {
    if (!mongooseService.validMongooseObjectId(commentId)) {
      return Promise.resolve(false);
    }
    const paginate = { skip: 0, limit: 30 };

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

    const data = await this.Comment.find({
      baseComment: commentId,
      isBaseComment: false,
      ...rest,
    })
      .populate('owner', 'profileImage firstName lastName')
      .limit(paginate.limit)
      .skip(paginate.skip)
      .sort({ 'meta.createdAt': -1 })
      .select('-passwordHash')
      .exec();

    const finals = [];
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const { comments, upvotes, downvotes, ...rest } = Utils.parseToJSON(
          data[i],
        );

        finals.push({
          ...rest,
          commentsCount: comments.length,
          upvotesCount: upvotes.length,
          downvotesCount: downvotes.length,
        });
      }
    }

    const totalDocumentCount = await this.Comment.countDocuments({
      baseComment: commentId,
      isBaseComment: false,
      ...rest,
    });

    return Promise.resolve({
      comments: finals,
      totalDocumentCount,
      skip: paginate.skip,
      limit: paginate.limit,
      queryWith: query,
    });
  }
}

export default new CommunityPostCommentDao();
