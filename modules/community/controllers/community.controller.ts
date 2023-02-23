import { query, Request, Response } from 'express';
import debug from 'debug';
import communityService from '../services/community.services';
import {
  apiCreatedResponse,
  apiOKResponse,
} from '../../../common/utils/apiResponses';

const log: debug.IDebugger = debug('app:Community-controller');

class CommunityController {
  /**
   * getAllCommunities
   * @param req
   * @param res
   */
  async getAllCommunities(req: Request, res: Response) {
    const { ...rest } = await communityService.getAll(req.query);
    const controllerRes = new apiOKResponse(rest);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  /**
   * create
   * @param req
   * @param res
   */
  async create(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.create(req.body);
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async createPost(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.createPost(
      req.body,
      res.locals.jwt.userId,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.deletePost(
      req.body.postId,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async putPost(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.putPost(
      req.params.postId,
      req.body,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async patchPost(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.putPost(
      req.params.postId,
      req.body,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async getAllPost(req: Request, res: Response): Promise<void> {
    const { ...rest } = await communityService.getAllPost(req.query);
    const controllerRes = new apiOKResponse(rest);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async getPost(req: Request, res: Response): Promise<void> {
    const { ...rest } = await communityService.getPost(req.params.postId);
    const controllerRes = new apiOKResponse(rest);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async upvotePost(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.upvotePost(
      req.params.postId,
      res.locals.jwt.userId,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async downvotePost(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.downvotePost(
      req.params.postId,
      res.locals.jwt.userId,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async commentOnAPost(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.commentOnAPost(
      req.params.postId,
      req.body,
      res.locals.jwt.userId,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async commentOnAComment(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.commentOnAComment(
      req.params.commentId,
      req.params.postId,
      req.body,
      res.locals.jwt.userId,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async getAllCommentOfAPost(req: Request, res: Response) {
    const { ...rest }: any = await communityService.getAllCommentOfAPost(
      req.params.postId,
      req.query,
    );
    const controllerRes = new apiOKResponse(rest);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async getAllCommentOfAComment(req: Request, res: Response) {
    const { ...rest }: any = await communityService.getAllCommentOfAComment(
      req.params.commentId,
      req.query,
    );
    const controllerRes = new apiOKResponse(rest);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async upvoteComment(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.upvoteComment(
      req.params.commentId,
      res.locals.jwt.userId,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }

  async downvoteComment(req: Request, res: Response): Promise<void> {
    const { message, ...rest } = await communityService.downvoteComment(
      req.params.commentId,
      res.locals.jwt.userId,
    );
    const controllerRes = new apiOKResponse(rest, message);
    res.status(controllerRes.statusCode).send(controllerRes);
  }
}

export default new CommunityController();
