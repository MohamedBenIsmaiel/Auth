import { Document, Types } from 'mongoose';

import { UserAddress, userEnums } from './entities';
import UsersDb from './repository';
import UserModel from './repository/model/user.model';
import UserUsecase from './use-cases';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  address?: IAddress;
  mobileNumber: string;
  role?: string;
  hobbies?: string[];
  password: string;
}

export interface IBuildUser {
  UserAddress: typeof UserAddress;
  userEnums: typeof userEnums;
}

export interface IAddress {
  country?: string;
  city?: string;
  street?: string;
}

export interface IBuildUsersDb {
  userModel: typeof UserModel;
}

export type TFindOne = Promise<
  (Document<any, any, IUser> & IUser & { _id: Types.ObjectId }) | null
>;

export interface IBuildListUsers {
  UsersDb: typeof UsersDb;
}

export type TBuildListUsers = () => Promise<any>;
export type TBuildGetMyProfile = ()=> Promise<any>;

export interface IBuildUserController {
  UserUsecase: typeof UserUsecase;
}
