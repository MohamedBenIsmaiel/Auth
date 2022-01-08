import { User } from '../entities';
import { IBuildRegister, IUser, TBuildRegister } from '../type';
import { Password } from '../services';
import { ErrorCodes, ErrorException } from '../../../errors-handler';
import { Filter } from '../services';

export default function buildRegister({
  UsersDb
}: IBuildRegister): TBuildRegister {
  return async function register(userData: IUser): Promise<IUser> {
    if (userData.role) delete userData.role; // only admin can set rules for users

    const user = new User(userData);

    await user.validate(); // if there is a validation error will throw error

    // find by email or mobile number
    const getUser: any = await UsersDb.findOne(
      Filter.mailOrMobileFiler(user.getEmail(), user.getMobileNumber())
    );

    if (getUser && getUser.email == userData.email)
      throw new ErrorException('Email already exist ', ErrorCodes.Validation);
    if (getUser && getUser.mobileNumber == userData.mobileNumber)
      throw new ErrorException(
        'Mobile number already exist',
        ErrorCodes.Validation
      );

    const hashPassword = await Password.hash(user.getPassword());
    user.setPassword(hashPassword);
    const registeredUser = await UsersDb.insertOne(user.toJson());
    return registeredUser;
  };
}
