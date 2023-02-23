import { MongooseObjectId } from '../../../common/types/mongoose.types';
export interface CommunityDto {
  _id?: MongooseObjectId;
  communityId?: MongooseObjectId;
  text?: string;
  post?: Array<unknown>;
  comments?: Array<unknown>;
  isBaseComment?: boolean;
  images?: Array<string | unknown>;
  upvotes?: Array<string | unknown>;
  downvotes?: Array<string | unknown>;
  isDagerous?: boolean;
  isViewable?: boolean;
  owner?: MongooseObjectId;
}
