import buildListUsers from './list-users';
import buildGetMyProfile from './get-my-profile';
import buildRegister from './register';
import buildLogin from './login';
import buildRefreshToken from './refresh-token';
import buildLogout from './logout';

import UsersDb from '../repository';
import { redisClient } from '../../../infrastructure';

const listUsers = buildListUsers({ UsersDb });
const getMyProfile = buildGetMyProfile({ UsersDb });
const register = buildRegister({ UsersDb });
const login = buildLogin({ UsersDb });
const refreshToken = buildRefreshToken();
const logout = buildLogout({ redisClient });

const UserUsecase = {
  listUsers,
  getMyProfile,
  register,
  login,
  refreshToken,
  logout
};
export default UserUsecase;
