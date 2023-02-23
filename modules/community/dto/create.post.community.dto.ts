import { MongooseObjectId } from '../../../common/types/mongoose.types';

export interface CreateCommunityPostDto {
  owner?: MongooseObjectId;
  community?: MongooseObjectId;
  title?: string;
  text: string;
  images?: Array<string | unknown>;
}
