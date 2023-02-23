import express from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';
import communityController from './controllers/community.controller';
import CommunityMiddleware from './middleware/community.middleware';
import UsersValidationMiddleware from './middleware/community.validation.middleware';
import { API_BASE_URI } from '../../config/env';
import accessAuthMiddleware from '../../common/middleware/accessAuth.middleware';

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
      .all(accessAuthMiddleware.ensureAuth)
      .get(
        accessAuthMiddleware.ensureSupport,
        accessAuthMiddleware.grantRoleAccess('readAny', 'Community'),
        communityController.getAllCommunities,
      )
      .post(
        accessAuthMiddleware.ensureSupport,
        accessAuthMiddleware.grantRoleAccess('readAny', 'Community'),
        communityController.create,
      )
      .put()
      .patch();

    // this.app.param(`userId`, UsersMiddleware.extractUserId);
    // this.app.param(`${API_BASE_URI}/userId`, UsersMiddleware.extractUserId);

    this.app
      .route(`${API_BASE_URI}/communities/post`)
      .all(accessAuthMiddleware.ensureAuth)
      .get(
        accessAuthMiddleware.grantRoleAccess('readAny', 'Community'),
        communityController.getAllCommunities,
      );

    // Create a Post
    // Update a Post
    // De;ete a Post
    // Fetch a Post
    // Upvote a Post
    // Downvote a Post
    // Report a Post
    // Save a Post
    // Comment on a Post
    // Get all Comments of a post
    // Upvote a Comment
    // Downvote a Comment
    // Comment on a Comment of a post
    // get all comments of a comments of a post

    // A post can have comment
    // A comment can have comments

    return this.app;
  }
}
