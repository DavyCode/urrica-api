import express from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';
import communityController from './controllers/community.controller';
import CommunityMiddleware from './middleware/community.middleware';
import UsersMiddleware from '../users/middleware/users.middleware';
import { API_BASE_URI } from '../../config/env';
import accessAuthMiddleware from '../../common/middleware/accessAuth.middleware';
import postValidationMiddleware from './middleware/post.validation.middleware';
import commentValidationMiddleware from './middleware/comment.validation.middleware';
import communityValidationMiddleware from './middleware/community.validation.middleware';

export class CommunityRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CommunityRoutes');
  }

  /**
   * Execute default abstract class from parent
   */
  configureRoutes(): express.Application {
    this.app
      .route(`${API_BASE_URI}/communities`)
      .all(
        accessAuthMiddleware.ensureSupport,
        UsersMiddleware.validateAuthUserExist,
      )
      .get(
        accessAuthMiddleware.grantRoleAccess('readAny', 'Community'),
        communityController.getAllCommunities, // √√
      )
      .post(
        accessAuthMiddleware.grantRoleAccess('createAny', 'Community'),
        communityValidationMiddleware.CreateCommunityValidator,
        communityController.create, // √√
      )
      .put() // TODO:
      .patch(); // TODO:

    this.app.param(
      `${API_BASE_URI}/posts/postId`,
      CommunityMiddleware.extractPostId,
    );

    this.app.param(
      `${API_BASE_URI}/posts/:postId/comments/:commentId`,
      CommunityMiddleware.extractCommentId,
    );

    this.app
      .route(`${API_BASE_URI}/posts`)
      .all(
        accessAuthMiddleware.ensureAuth,
        UsersMiddleware.validateAuthUserExist,
      )
      .get(
        accessAuthMiddleware.grantRoleAccess('readAny', 'Post'),
        communityController.getAllPost, // √√
      )
      .post(
        postValidationMiddleware.CreatePostValidator,
        communityController.createPost, // √√
      );

    this.app.route(`${API_BASE_URI}/public/posts`).all().get(
      communityController.getAllPost, // √√
    );

    this.app
      .route(`${API_BASE_URI}/posts/:postId`)
      .all(
        accessAuthMiddleware.ensureAuth,
        UsersMiddleware.validateAuthUserExist,
      )
      .get(
        accessAuthMiddleware.grantRoleAccess('readAny', 'Post'),
        // communityController.getPost, // √√
        communityController.getPostWithComments,
      )
      .delete(
        postValidationMiddleware.postParamsValidator,
        communityController.deletePost, // √√
      )
      .patch(
        postValidationMiddleware.CreatePostValidator,
        postValidationMiddleware.postParamsValidator,
        communityController.patchPost,
      )
      .put(
        postValidationMiddleware.CreatePostValidator,
        postValidationMiddleware.postParamsValidator,
        communityController.putPost,
      );

    this.app.route(`${API_BASE_URI}/posts/:postId/upvote`).put(
      accessAuthMiddleware.ensureAuth,
      UsersMiddleware.validateAuthUserExist,
      postValidationMiddleware.postParamsValidator,
      communityController.upvotePost, // TODO - cannot upvote a Post twice
    );

    this.app
      .route(`${API_BASE_URI}/posts/:postId/downvote`)
      .put(
        accessAuthMiddleware.ensureAuth,
        UsersMiddleware.validateAuthUserExist,
        postValidationMiddleware.postParamsValidator,
        communityController.downvotePost,
      );

    this.app
      .route(`${API_BASE_URI}/posts/:postId/comments`)
      .all(
        accessAuthMiddleware.ensureAuth,
        UsersMiddleware.validateAuthUserExist,
      )
      .get(
        accessAuthMiddleware.grantRoleAccess('readAny', 'Comment'),
        postValidationMiddleware.postParamsValidator,
        communityController.getAllCommentOfAPost, // √√
      )
      .post(
        commentValidationMiddleware.CreateCommentValidator,
        communityController.commentOnAPost, // √√
      )
      .put() // TODO:
      .delete(); // TODO:

    this.app
      .route(`${API_BASE_URI}/posts/:postId/comments/:commentId`)
      .all(
        accessAuthMiddleware.ensureAuth,
        UsersMiddleware.validateAuthUserExist,
      )
      .get(
        accessAuthMiddleware.grantRoleAccess('readAny', 'Comment'),
        commentValidationMiddleware.CommentOnCommentParamsValidator,
        communityController.getAllCommentOfAComment, // √√
      )
      .post(
        commentValidationMiddleware.CreateCommentValidator,
        communityController.commentOnAComment, // √√
      );

    this.app
      .route(`${API_BASE_URI}/posts/:postId/comments/:commentId/upvote`)
      .put(
        accessAuthMiddleware.ensureAuth,
        UsersMiddleware.validateAuthUserExist,
        commentValidationMiddleware.CommentOnCommentParamsValidator,
        communityController.upvoteComment, // TODO - cannot upvote a Comment twice
      );

    this.app
      .route(`${API_BASE_URI}/posts/:postId/comments/:commentId/downvote`)
      .put(
        accessAuthMiddleware.ensureAuth,
        UsersMiddleware.validateAuthUserExist,
        commentValidationMiddleware.CommentOnCommentParamsValidator,
        communityController.downvoteComment,
      );

    // Create a Post - √√√
    // Update a Post - √√
    // Delete a Post - [delete its comments along] √√
    // Fetch a Post - √√√√ [ TODO-- (with its first 10 comments)]
    // Upvote a Post - put user in upvote list [user,user] √√
    // Downvote a Post - remove user in upvote list [user,user] √√
    // Report a Post - [SKIP] create a report, stating the condition ['inappropraite', 'not helpful', 'spam', 'rated x']
    // Save a Post - [SKIP]
    // Comment on a Post - create new comment, tie it to a post √√√
    // Comment on a Comment - create new comment, tie it to a comment of a post √√√
    // Get all Comments of a post - √√
    // Get all comments of a comments  - √√
    // Upvote a Comment √√
    // Downvote a Comment √√

    // NOTES
    // A post can have comments
    // A comment can have comments

    return this.app;
  }
}
