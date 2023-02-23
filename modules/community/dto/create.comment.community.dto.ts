import { MongooseObjectId } from '../../../common/types/mongoose.types';

export interface CreateCommunityPostCommentDto {
  communityId: MongooseObjectId;
  post: MongooseObjectId;
  text: string;
  isBaseComment: boolean;
  comments: Array<unknown>;
  images: Array<string | unknown>;
}
