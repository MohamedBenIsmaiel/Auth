import { FilterQuery } from 'mongoose';
import { IUser } from '../type';

export default class Filter {
  static mailOrMobileFiler(
    email: string,
    mobileNumber: string
  ): FilterQuery<IUser> {
    return { $or: [{ email }, { mobileNumber }] };
  }
}
