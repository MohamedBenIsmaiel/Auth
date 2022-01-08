import { FilterQuery } from 'mongoose';
import { User } from '../entities';

import { IBuildUsersDb, IUser, TFindOne } from '../type';

export default function buildUsersDb({ userModel }: IBuildUsersDb) {
  return class UsersDb {
    async findOne(
      filter: FilterQuery<IUser> = {},
      projection: string[] = ['-password']
    ): TFindOne {
      return userModel.findOne(filter, projection);
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

    async insertMany(data: typeof User[]): Promise<IUser[]> {
      return userModel.insertMany(data);
    }

    async insertOne(data: any): Promise<IUser> {
      return userModel.insertMany([data]).then((result: any) => {
        return result[0];
      });
    }
  };
}
