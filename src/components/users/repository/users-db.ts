import { FilterQuery } from 'mongoose';

import { IBuildUsersDb, IUser, TFindOne } from '../type';

export default function buildUsersDb({ userModel }: IBuildUsersDb) {
  return class UsersDb {
    async findOne(filter: FilterQuery<IUser>, projection: string[]): TFindOne {
      return userModel.findOne(filter, projection);
    }

    async find(
      filter: FilterQuery<IUser>,
      projection?: string[],
      options = {}
    ): Promise<any[]> {
      return userModel.find(filter, projection, {});
    }
  };
}
