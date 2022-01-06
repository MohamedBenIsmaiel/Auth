import { FilterQuery } from 'mongoose';

import { IBuildUsersDb, IUser, TFindOne } from '../type';

export default function buildUsersDb({ userModel }: IBuildUsersDb) {
  return class UsersDb {
    async findOne(filter: FilterQuery<IUser>, projection: string[]): TFindOne {
      if (!projection || (projection && !projection.length)) {
        projection = ['-password'];
      }
      return userModel.findOne();
    }

    async find(
      filter: FilterQuery<IUser>,
      projection?: string[],
      options = {}
    ): Promise<IUser[]> {
      if (!projection || (projection && !projection.length)) {
        projection = ['-password'];
      }

      return userModel.find(filter, projection, options);
    }

    async insert(data: any) {
      return userModel.insertMany(data);
    }
  };
}
