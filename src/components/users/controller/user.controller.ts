import { NextFunction, Request, Response } from 'express';

import { IBuildUserController } from '../type';

export default function buildUserController({
  UserUsecase
}: IBuildUserController) {
  return class UserController {
    static async listUser(_req: Request, res: Response): Promise<Response> {
      const users = await UserUsecase.listUsers();
      return res.json({ statusCode: 200, data: users });
    }

    static async getMyprofile(_req: Request, res: Response): Promise<Response> {
      const myProfile = await UserUsecase.getMyProfile();
      return res.json({ statusCode: 200, data: myProfile });
    }

    static async register(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response> {
      const registeredUser = await UserUsecase.register(req.body);
      return res.json({ statusCode: 200, data: registeredUser });
    }
  };
}
