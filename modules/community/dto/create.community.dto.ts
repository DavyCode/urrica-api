import { MongooseObjectId } from '../../../common/types/mongoose.types';

export interface CreateCommunityDto {
  communityId?: string;
  communityName: string;
}
