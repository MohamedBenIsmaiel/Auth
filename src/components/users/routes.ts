import express, { Router } from 'express';
import UserController from './controller';
import { userPath } from './config';

const router: Router = express.Router();

router.get(userPath.listUsers, UserController.listUser);
router.get(userPath.viewProfile, UserController.getMyprofile);

export default router;
