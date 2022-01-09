import { User } from '../entities';
import { IBuildRegister, ILogin, TBuildLogin } from '../type';
import { Password, Token } from '../services';
import { ErrorCodes, ErrorException } from '../../../errors-handler';

export default function buildLogin({ UsersDb }: IBuildRegister): TBuildLogin {
  return async function login(userData: any): Promise<ILogin> {
    let user = new User(userData);
    await user.validateLogin(); // if there is a validation error will throw error

    const getUser: any = await UsersDb.findOne({ email: user.getEmail() }, [
      'password',
      'role'
    ]);
    if (!getUser)
      throw new ErrorException(
        "Invalid user's email or passowrd ",
        ErrorCodes.Validation
      );

    const isValidPassword = await Password.compare(
      userData.password,
      getUser.password
    );

    if (!isValidPassword)
      throw new ErrorException(
        "Invalid user's email or passowrd ",
        ErrorCodes.Validation
      );

    user = new User(getUser);
    const accessToken = await Token.signeAccessToken({
      userId: user.getId(),
      role: user.getRole
    });

    const refreshToken = await Token.signeRefreshToken({
      userId: user.getId(),
      role: user.getRole()
    });

    return { accessToken, refreshToken };
  };
}
