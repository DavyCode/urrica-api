import { MongooseObjectId } from '../../../common/types/mongoose.types';

export interface CreateCommunityPostDto {
  communityId: MongooseObjectId;
  title: string;
  text: string;
  images: Array<string | unknown>;
}
