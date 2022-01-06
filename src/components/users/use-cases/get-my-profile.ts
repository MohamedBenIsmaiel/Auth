import { IBuildListUsers, TBuildGetMyProfile } from '../type';

export default function buildGetMyProfile({
  UsersDb
}: IBuildListUsers): TBuildGetMyProfile {
  return async function getMyProfile() {
    return UsersDb.findOne({}, []);
  };
}
