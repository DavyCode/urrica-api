import CommunityDao from '../daos/community.dao';
import PostDao from '../daos/post.community.dao';
import CommentDao from '../daos/comments.community.dao';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { CreateCommunityDto } from '../dto/create.community.dto';
import { CreateCommunityPostDto } from '../dto/create.post.community.dto';
import { PutPostDto } from '../dto/put.post.community.dto';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../../../common/utils/errors';
import {} from '../../../common/constant/errorMessages';
import Pubsub from '../events/community.events';
import Utils from '../../../common/utils/utils';
import { MongooseObjectId } from '../../../common/types/mongoose.types';
import {
  CreateCommunityPostCommentDto,
  CreateCommunityCommentsCommentDto,
} from '../dto/create.comment.community.dto';

class CommunityService implements CRUD {
  /**
   * Create
   * @param resource
   * @returns
   */
  async create(resource: CreateCommunityDto) {
    const initialCommunity = await CommunityDao.findOne({
      // communityId: resource.communityId,
      communityName: resource.communityName,
    });

    if (initialCommunity) {
      throw new ForbiddenError('Cannot duplicate community ID or Name');
    }

    const newCommunity = await CommunityDao.create({
      ...resource,
      communityId: Utils.generateUniqueId(),
    });
    return { message: 'Community created', newCommunity };
  }

  /**
   * putById
   * @param id
   * @param resource
   * @returns
   */
  async putById(id: string, resource: any): Promise<any> {
    return { message: 'Update successful' };
  }

  async getById(id: string) {
    const item = await CommunityDao.getById(id);
    if (!item) {
      throw new NotFoundError(`item ${id} not found`);
    }
    return {
      item,
    };
  }

  async getAll(query?: any) {
    return CommunityDao.getAll(query);
  }

  async getTotalCount() {
    return CommunityDao.getTotalCount();
  }

  /**
   * createPost
   * @param resource CreateCommunityPostDto
   * @returns
   */
  async createPost(resource: CreateCommunityPostDto, userId: MongooseObjectId) {
    const baseCommunity: any = await CommunityDao.findOne({
      communityId: 'URRICA_COM_0001',
    });
    if (!baseCommunity) {
      throw new NotFoundError('Base Community not found');
    }

    const newPost = await PostDao.create({
      community: baseCommunity._id,
      ...resource,
      owner: userId,
    });
    return { message: 'Post created', newPost };
  }

  async deletePost(postId: string) {
    const deletedPost = await PostDao.delete(postId);
    if (deletedPost) {
      // find all its comments and delete
      await this.deleteAssociatedComments(postId);
    }
    return { message: 'Post deleted', deletedPost };
  }

  async getPost(postId: string) {
    const post = await PostDao.getById(postId);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return { post };
  }

  async getPostWithComments(postId: string) {
    const post = await PostDao.findOne({ _id: postId });

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    const { upvotes, downvotes, comments, ...rest } = Utils.parseToJSON(post);
    const thePost = {
      ...rest,
      commentsCount: comments.length,
      upvotesCount: upvotes.length,
      downvotesCount: downvotes.length,
    };

    const commentsFound: any = await CommentDao.getAllCommentOfAPost(
      postId,
      {},
    );
    if (commentsFound) {
      return { comments: commentsFound.comments, post: thePost };
    }

    return { comments: [], post: thePost };
  }

  async putPost(postId: string, resource: PutPostDto) {
    const post = await PostDao.put(postId, resource, {
      new: true,
      upsert: true,
    });

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return { post, message: 'Update successful' };
  }

  private async deleteAssociatedComments(postId: string) {
    const isDeletedComments = await CommentDao.deleteManyByPost(postId);
    return isDeletedComments;
  }

  /**
   * getAllPost
   * @param query
   * @returns
   */
  async getAllPost(query?: any) {
    return PostDao.getAll(query);
  }

  async upvotePost(postId: string, userId: MongooseObjectId) {
    // A user cannot upvote & downvote at the same time
    // if a user upvote, remove them from downvote, vise versa
    // When a user upvote remove them from upvote list
    const post = await PostDao.upvotePost(postId, userId);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return { post, message: 'Vote added' };
  }

  async downvotePost(postId: string, userId: MongooseObjectId) {
    // A user cannot upvote & downvote at the same time
    // if a user upvote, remove them from downvote, vise versa
    // When a  user downvote remove them from upvote list
    const post = await PostDao.downvotePost(postId, userId);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return { post, message: 'Vote removed' };
  }

  // async createComment(
  //   postId: string,
  //   userId: MongooseObjectId,
  //   resource: CreateCommunityPostCommentDto,
  // ) {
  //   const post: any = await PostDao.findOne({ _id: postId });
  //   if (!post) {
  //     throw new NotFoundError('Post not found');
  //   }

  //   const baseCommunity: any = await CommunityDao.findOne({
  //     communityId: 'URRICA_COM_0001',
  //   });
  //   if (!baseCommunity) {
  //     throw new NotFoundError('Base Community not found');
  //   }

  //   if (!resource.isBaseComment) {
  //     // if it is not base comment, check for parent
  //     const baseComment: any = await CommentDao.findOne({
  //       _id: resource.baseCommentId,
  //     });
  //     if (!baseComment) {
  //       throw new NotFoundError('Base Comment not found');
  //     }

  //     const newComment = await CommentDao.create({
  //       community: baseCommunity._id,
  //       post: post._id,
  //       baseComment: baseComment._id,
  //       ...resource,
  //       isBaseComment: false,
  //     });

  //     await this.addToBaseCommentList(baseComment._id, newComment._id);
  //     return { message: 'Comment added', newComment };
  //   }

  //   const newComment = await CommentDao.create({
  //     community: baseCommunity._id,
  //     post: post._id,
  //     ...resource,
  //     isBaseComment: true,
  //   });

  //   await this.addCommentToPostCommentList(post._id, newComment._id);
  //   return { message: 'Comment created', newComment };
  // }

  async commentOnAPost(
    postId: string,
    resource: CreateCommunityPostCommentDto,
    userId: MongooseObjectId,
  ) {
    if (!resource.isBaseComment) {
      throw new ForbiddenError('Only base comments allowed');
    }

    const post: any = await PostDao.findOne({ _id: postId });
    if (!post) {
      throw new NotFoundError('Post not found!');
    }

    const baseCommunity: any = await CommunityDao.findOne({
      communityId: 'URRICA_COM_0001',
    });

    if (!baseCommunity) {
      throw new NotFoundError('Base Community not found');
    }

    const newComment = await CommentDao.create({
      community: baseCommunity._id,
      post: post._id,
      ...resource,
      isBaseComment: true,
      owner: userId,
    });

    await this.addCommentToPostCommentList(post._id, newComment._id);
    return { message: 'Comment created', comment: newComment };
  }

  async commentOnAComment(
    postId: string,
    baseCommentId: string,
    resource: CreateCommunityCommentsCommentDto,
    userId: MongooseObjectId,
  ) {
    if (resource.isBaseComment) {
      throw new ForbiddenError('Can only comment on a comment');
    }

    const post: any = await PostDao.findOne({ _id: postId });

    if (!post) {
      throw new NotFoundError('Post not found!!');
    }

    const baseCommunity: any = await CommunityDao.findOne({
      communityId: 'URRICA_COM_0001',
    });

    if (!baseCommunity) {
      throw new NotFoundError('Base Community not found');
    }

    const baseComment: any = await CommentDao.findOne({
      _id: baseCommentId,
    });
    if (!baseComment) {
      throw new NotFoundError('Base Comment not found!!!');
    }

    const newComment = await CommentDao.create({
      ...resource,
      community: baseCommunity._id,
      post: post._id,
      baseComment: baseComment._id,
      isBaseComment: false,
      owner: userId,
    });

    await this.addToBaseCommentList(baseComment._id, newComment._id);
    return { message: 'Comment added', comment: newComment };
  }

  async addCommentToPostCommentList(
    postId: string,
    commentId: MongooseObjectId,
  ) {
    const updatedPost = await PostDao.findByIdAndAddtoList(
      postId,
      {
        comments: commentId,
      },
      { upsert: true, new: true },
    );

    if (!updatedPost) {
      throw new NotFoundError('Post not found!!');
    }

    return { post: updatedPost, message: 'Comment added to post' };
  }

  async removeCommentFromPostCommentList(
    postId: string,
    commentId: MongooseObjectId,
  ) {
    const updatedPost = await PostDao.findByIdAndRemoveFromList(
      postId,
      {
        comments: commentId,
      },
      { upsert: true, new: true },
    );

    if (!updatedPost) {
      throw new NotFoundError('Post not found');
    }

    return { post: updatedPost, message: 'Comment removed from post' };
  }

  async addToBaseCommentList(
    baseCommentId: string,
    commentId: MongooseObjectId,
  ) {
    const updatedComment = await CommentDao.findByIdAndAddtoList(
      baseCommentId,
      {
        comments: commentId,
      },
      { upsert: true, new: true },
    );

    if (!updatedComment) {
      throw new NotFoundError('Base comment not found');
    }

    return {
      comment: updatedComment,
      message: 'Comment added to list of comments',
    };
  }

  async removeFromBaseCommentList(
    baseCommentId: string,
    commentId: MongooseObjectId,
  ) {
    const updatedComment = await CommentDao.findByIdAndRemoveFromList(
      baseCommentId,
      {
        comments: commentId,
      },
      { upsert: true, new: true },
    );

    if (!updatedComment) {
      throw new NotFoundError('Base comment not found');
    }

    return {
      comment: updatedComment,
      message: 'Comment removed to list of comments',
    };
  }

  async getAllCommentOfAPost(postId: string, query?: any) {
    return CommentDao.getAllCommentOfAPost(postId, query);
  }

  async getAllCommentOfAComment(commentId: string, query?: any) {
    return CommentDao.getAllCommentOfAComment(commentId, query);
  }

  async upvoteComment(commentId: string, userId: MongooseObjectId) {
    // A user cannot upvote & downvote at the same time
    // if a user upvote, remove them from downvote, vise versa
    // When a  user downvote remove them from upvote list
    const post = await CommentDao.upvoteComment(commentId, userId);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return { post, message: 'Vote added' };
  }

  async downvoteComment(commentId: string, userId: MongooseObjectId) {
    // A user cannot upvote & downvote at the same time
    // if a user upvote, remove them from downvote, vise versa
    // When a user upvotes remove them from downvote list
    const post = await CommentDao.downvoteComment(commentId, userId);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return { post, message: 'Vote removed' };
  }
}

export default new CommunityService();
