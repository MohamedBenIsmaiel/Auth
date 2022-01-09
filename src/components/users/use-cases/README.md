# Use-case Directory

use-case is the second base of our domain , it contains the use-cases for our app , use-case is the action that user can do , so user can register , login or view his informationi

###  user-case consist of
* register.ts which contain the logic how can the user login to our system 

```
register.ts file

export default function buildRegister({
  UsersDb
}: IBuildRegister): TBuildRegister {
  return async function register(userData: IUser): Promise<any> {
    if (userData.role) delete userData.role; // only admin can set rules for users

    const user = new User(userData);
```

buildRegister is abuilder function that task `UsersDb` which reperesnt the reposaitry in our app and return register function  

* login usecase
* logout and etc .. 
all use-case follow the same convention
* index is the start point for our use-case dir so all use-cases are imported and built in it and then exported 

```
index.ts file

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
```
