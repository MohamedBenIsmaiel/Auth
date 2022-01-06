import buildUserController from './user.controller';
import UserUsecase from '../use-cases';

const UserController = buildUserController({ UserUsecase });

export default UserController;
