import { AccessControl, Query } from 'accesscontrol';
import { rolesEnum } from '../constant/enum';

const ac: AccessControl = new AccessControl();

export default (() => {
  ac.grant(rolesEnum.USER).readOwn('User').updateOwn('User');

  ac.grant(rolesEnum.AGENT).extend(rolesEnum.USER);

  ac.grant(rolesEnum.SUPPORT)
    .extend(rolesEnum.USER)
    .readAny('User')
    .readAny('User')
    .updateAny('User')
    .createAny('User');

  ac.grant(rolesEnum.ADMIN).extend(rolesEnum.SUPPORT);

  ac.grant(rolesEnum.SUPER_ADMIN)
    .extend(rolesEnum.USER)
    .extend(rolesEnum.SUPPORT)
    .extend(rolesEnum.ADMIN)
    .deleteAny('User');

  return ac as any;
})();
