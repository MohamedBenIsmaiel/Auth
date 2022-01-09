import { IBuildListUsers, TBuildListUsers } from '../type';
import { Permission } from '../services/index';
import { ErrorCodes, ErrorException } from '../../../errors-handler';

export default function buildListUsers({
  UsersDb
}: IBuildListUsers): TBuildListUsers {
  return async function listUsers(user) {
    if (!Permission.isAdmin(user.role))
      throw new ErrorException('Permission denied ', ErrorCodes.Permission);
    return UsersDb.find({});
  };
}
