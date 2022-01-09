import { User } from '../entities';
import { IBuildListUsers, TBuildGetMyProfile, IUser } from '../type';

export default function buildGetMyProfile({
  UsersDb
}: IBuildListUsers): TBuildGetMyProfile {
  return async function getMyProfile(user: any): Promise<any> {
    return UsersDb.findOne({ id: user.userId });
  };
}
