import express, { Router } from 'express';
import UserController from './controller';
import { userPath } from './config';
import { asyncHandler } from '../../middlewares/indext';

const router: Router = express.Router();

router.get(userPath.listUsers, UserController.listUser);
router.get(userPath.viewProfile, UserController.getMyprofile);
router.post(userPath.register, asyncHandler(UserController.register));

export default router;
