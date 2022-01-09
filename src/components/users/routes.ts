import express, { Router } from 'express';
import UserController from './controller';
import { userPath } from './config';
import { asyncHandler } from '../../middlewares/indext';
import { verifyAccessToken } from '../../middlewares/indext';

const router: Router = express.Router();

router.get(
  userPath.listUsers,
  verifyAccessToken,
  asyncHandler(UserController.listUser)
);

router.get(
  userPath.viewProfile,
  verifyAccessToken,
  asyncHandler(UserController.getMyprofile)
);

router.post(userPath.register, asyncHandler(UserController.register));

router.post(userPath.login, asyncHandler(UserController.login));

router.get(userPath.refreshToken, asyncHandler(UserController.refreshToken));

router.delete(userPath.logout, asyncHandler(UserController.logout));

export default router;
