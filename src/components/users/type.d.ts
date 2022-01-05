import { UserAddress, userEnums } from './entities';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  address: IAddress;
  mobileNumber: string;
  role: string;
  hobbies?: string[];
}

export interface IBuildUser {
  UserAddress: typeof UserAddress;
  userEnums: typeof userEnums;
}

export interface IAddress {
  country: string;
  city: string;
  street: string;
}
