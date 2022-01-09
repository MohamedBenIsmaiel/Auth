import { ErrorCodes, ErrorException } from '../../../errors-handler';
import { Token } from '../services';
import { ILogin } from '../type';

export default function buildRefreshToken(): ({
  refToken
}: any) => Promise<ILogin> {
  return async function refreshTokenSecret({ refToken }): Promise<ILogin> {
    if (!refToken)
      throw new ErrorException(
        'Please provide a refresh token ',
        ErrorCodes.Unauthenticated
      );

    const { userId, role }: any = await Token.verifyRefreshToken(refToken);
    const accessToken = await Token.signeAccessToken({ userId, role });
    const refreshToken = await Token.signeRefreshToken({ userId, role });
    return { accessToken, refreshToken };
  };
}
