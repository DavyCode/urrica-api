import { MongooseObjectId } from '../../../common/types/mongoose.types';

export type User = {
  save(): unknown;
  _id?: MongooseObjectId;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  state?: string;
  address?: string;
  country?: string;
  profileImage?: string;
  resetPasswordPin?: string;
  passwordHash?: string;
  verifyEmailOtp?: string;
  active?: boolean;
  verified?: boolean;
  lock?: boolean;
  role?: string;
  permissionLevel?: number;
  googleToken?: string;
  googleSubUserId?: string;
  howDidYouHearAboutUs?: string;
};
