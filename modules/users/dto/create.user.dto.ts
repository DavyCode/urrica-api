import { MongooseObjectId } from '../../../common/types/mongoose.types';

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  howDidYouHearAboutUs: string;
  referredBy?: MongooseObjectId;
}
