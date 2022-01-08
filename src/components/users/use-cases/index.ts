import buildListUsers from './list-users';
import buildGetMyProfile from './get-my-profile';
import buildRegister from './register';

import UsersDb from '../repository';

const listUsers = buildListUsers({ UsersDb });
const getMyProfile = buildGetMyProfile({ UsersDb });
const register = buildRegister({ UsersDb });

const UserUsecase = { listUsers, getMyProfile, register };
export default UserUsecase;
