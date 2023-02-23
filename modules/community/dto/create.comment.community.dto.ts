import { MongooseObjectId } from '../../../common/types/mongoose.types';

export interface CreateCommunityPostCommentDto {
  community?: MongooseObjectId;
  post?: MongooseObjectId;
  text: string;
  isBaseComment: boolean;
  // baseCommentId?: MongooseObjectId;
  // baseComment?: MongooseObjectId;
  // comments: Array<unknown>;
  images?: Array<string | unknown>;
}

export interface CreateCommunityCommentsCommentDto {
  community?: MongooseObjectId;
  post?: MongooseObjectId;
  text: string;
  isBaseComment: boolean;
  baseCommentId?: MongooseObjectId;
  baseComment?: MongooseObjectId;
  // comments: Array<unknown>;
  images?: Array<string | unknown>;
}
