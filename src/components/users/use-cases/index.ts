import buildListUsers from './list-users';
import buildGetMyProfile from './get-my-profile';
import buildRegister from './register';
import buildLogin from './login';
import buildRefreshToken from './refresh-token';

import UsersDb from '../repository';

const listUsers = buildListUsers({ UsersDb });
const getMyProfile = buildGetMyProfile({ UsersDb });
const register = buildRegister({ UsersDb });
const login = buildLogin({ UsersDb });
const refreshToken = buildRefreshToken();

const UserUsecase = { listUsers, getMyProfile, register, login, refreshToken };
export default UserUsecase;
