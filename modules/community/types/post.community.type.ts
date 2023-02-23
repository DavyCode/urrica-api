import { MongooseObjectId } from '../../../common/types/mongoose.types';

export type CommunityPostType = {
  save(): unknown;
  _id?: MongooseObjectId;
  communityId?: MongooseObjectId;
  title?: string;
  text?: string;
  comments?: Array<unknown>;
  images?: Array<string | unknown>;
  upvotes?: Array<string | unknown>;
  downvotes?: Array<string | unknown>;
  isDagerous?: boolean;
  isViewable?: boolean;
  owner?: MongooseObjectId;
};
