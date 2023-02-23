import debug from 'debug';
import { InternalServerError } from '../../../common/utils/errors';

const log: debug.IDebugger = debug('app:Community-dao');

export default (CommunityDao: any) => {
  Promise.resolve(CommunityDao.find({ communityId: 'URRICA_COM_0001' }))
    .then((community: any) => {
      if (community && community.length > 0) {
        log("======Community Already exist, don't seed=====", community.length);
      } else {
        Promise.resolve(
          CommunityDao.create({
            communityName: 'URRICA_COM_0001',
            communityId: 'URRICA_COM_0001',
          }),
        )
          .then((item) => {
            log({
              saved: item
                ? 'True: Community seeder created'
                : 'False: Community seeder Failed',
            });
          })
          .catch((err: any) => {
            log('======Community  could not be seeded=====', err);
            process.exit(1);
          });
      }
    })
    .catch((err) => {
      throw new InternalServerError(
        `Failed to seed CommunityDao : ${err.message}`,
      );
    });
};
