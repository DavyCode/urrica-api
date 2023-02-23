import { MongooseObjectId } from '../../../common/types/mongoose.types';

export type CommunityType = {
  save(): unknown;
  _id?: MongooseObjectId;
  communityId: string;
  communityName: string;
};
