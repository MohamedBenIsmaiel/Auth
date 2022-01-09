import { ErrorCodes, ErrorException } from '../../../errors-handler';
import { Token } from '../services';
import { logger } from '../../../middlewares/indext';

export default function buildLogout({ redisClient }: any) {
  return async function logout({ refToken }: { refToken: string }) {
    if (!refToken)
      throw new ErrorException(
        ' Please provide refreshToken ',
        ErrorCodes.Validation
      );

    const { userId }: any = await Token.verifyRefreshToken(refToken);
    redisClient.DEL(userId, (err: any, val: any) => {
      if (err) {
        logger.error(err.message);
        throw new ErrorException(
          ' Internal server Error ',
          ErrorCodes.Unauthenticated
        );
      }

      logger.error(val);
      return 'You have been logedout';
    });
  };
}
