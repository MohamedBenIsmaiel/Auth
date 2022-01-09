import buildListUsers from './list-users';
import buildGetMyProfile from './get-my-profile';
import buildRegister from './register';
import buildLogin from './login';

import UsersDb from '../repository';

const listUsers = buildListUsers({ UsersDb });
const getMyProfile = buildGetMyProfile({ UsersDb });
const register = buildRegister({ UsersDb });
const login = buildLogin({ UsersDb });

const UserUsecase = { listUsers, getMyProfile, register, login };
export default UserUsecase;
