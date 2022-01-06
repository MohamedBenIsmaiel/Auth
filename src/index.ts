import express, { Application, Request, Response } from 'express';

import MongoDb from './infrastructure/mongodb-init';
import { serverPort } from './config';
import UserUsecase from './components/users/use-cases';

class App {
  private app: Application = express();
  private port = serverPort || 3000;

  constructor() {
    this.start();
    this.healthy();
    this.dummy();
  }

  start(): void {
    this.listen();
    MongoDb.init();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  healthy(): void {
    this.app.get(
      '/',
      async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
          message: 'Hello World!'
        });
      }
    );
  }

  listen(): void {
    this.app.listen(this.port, (): void => {
      console.log(`Connected successfully on port ${this.port}`);
    });
  }

  async dummy(): Promise<void>{
    const result = await UserUsecase.listUsers();
    console.log('>>>>>>>> result ', result);
  }
}

new App();
