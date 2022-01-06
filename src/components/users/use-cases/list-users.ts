import { IBuildListUsers, TBuildListUsers } from '../type';

export default function buildListUsers({
  UsersDb
}: IBuildListUsers): TBuildListUsers {
  return async function listUsers() {
    return UsersDb.find({});
  };
}
