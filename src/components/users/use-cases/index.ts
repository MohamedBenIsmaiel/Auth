import buildListUsers from './list-users';
import buildGetMyProfile from './get-my-profile';

import UsersDb from '../repository';

const listUsers = buildListUsers({ UsersDb });
const getMyProfile = buildGetMyProfile({ UsersDb });

const UserUsecase = { listUsers, getMyProfile };
export default UserUsecase;
