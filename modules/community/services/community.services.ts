import CommunityDao from '../daos/community.dao';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { CreateCommunityDto } from '../dto/create.community.dto';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../../../common/utils/errors';
import {} from '../../../common/constant/errorMessages';
import Pubsub from '../events/community.events';
import Utils from '../../../common/utils/utils';
import { MongooseObjectId } from '../../../common/types/mongoose.types';

class CommunityService implements CRUD {
  /**
   * Create
   * @param resource
   * @returns
   */
  async create(resource: CreateCommunityDto) {
    const initialCommunity = await CommunityDao.findByIdOrName({
      communityId: resource.communityId,
      communityName: resource.communityName,
    });
    if (initialCommunity) {
      throw new ForbiddenError('Cannot duplicate community ID or Name');
    }

    const newCommunity = await CommunityDao.create(resource);
    return { message: 'Community created', newCommunity };
  }

  /**
   * putById
   * @param id
   * @param resource
   * @returns
   */
  async putById(id: string, resource: any): Promise<any> {
    return { message: 'Update successful' };
  }

  async getById(id: string) {
    const item = await CommunityDao.getById(id);
    if (!item) {
      throw new NotFoundError(`item ${id} not found`);
    }
    return {
      item,
    };
  }

  async getAll(query?: any) {
    return CommunityDao.getAll(query);
  }

  async getTotalCount() {
    return CommunityDao.getTotalCount();
  }
}

export default new CommunityService();
