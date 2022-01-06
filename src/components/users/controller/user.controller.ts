import { IBuildUserController } from '../type';

export default function buildUserController({
  UserUsecase
}: IBuildUserController) {
  return class UserController {
    static async listUser() {
      const users = await UserUsecase.listUsers();
      return {
        statusCode: 200,
        data: users
      };
    }

    static async getMyprofile() {
      const myProfile = await UserUsecase.getMyProfile();
      return {
        statusCode: 200,
        data: myProfile
      };
    }
  };
}
