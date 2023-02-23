import { MongooseObjectId } from '../../../common/types/mongoose.types';
export interface CommunityDto {
  _id?: MongooseObjectId;
  communityId?: string;
  communityName?: string;
}
