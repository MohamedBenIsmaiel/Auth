import buildUsersDb from './users-db';
import UserModel from './model/user.model';

const UsersDbClass = buildUsersDb({ userModel: UserModel });
const UsersDb = new UsersDbClass();

export default UsersDb;
