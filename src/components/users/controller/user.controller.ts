import { Request, Response } from 'express';

import { IBuildUserController } from '../type';

export default function buildUserController({
  UserUsecase
}: IBuildUserController) {
  return class UserController {
    static async listUser(req: Request, res: Response): Promise<Response> {
      const users = await UserUsecase.listUsers();
      return res.json({ statusCode: 200, data: users });
    }

    static async getMyprofile(req: any, res: Response): Promise<Response> {
      const myProfile = await UserUsecase.getMyProfile(req.user);
      return res.json({ statusCode: 200, data: myProfile });
    }

    static async register(req: Request, res: Response): Promise<Response> {
      const registeredUser = await UserUsecase.register(req.body);
      return res.json({ statusCode: 200, data: registeredUser });
    }

    static async login(req: Request, res: Response): Promise<Response> {
      const tokens = await UserUsecase.login(req.body);
      return res.json({ statusCode: 200, data: tokens });
    }
  };
}
