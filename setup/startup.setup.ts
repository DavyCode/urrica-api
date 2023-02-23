/**
 * Process executed on server startup
 */
import communityDao from '../modules/community/daos/community.dao';
import communitySeeder from '../modules/community/seeder/seeder.community';

export default () => {
  communitySeeder(communityDao);
};
