import express, { Application, Request, Response } from 'express';
import compression from 'compression';
import * as helmet from 'helmet';

import { MongoDb } from './infrastructure';
import { serverPort } from './config';
import userRoutes from './components/users/routes';
import { errorHandler } from './middlewares/indext';

class App {
  private app: Application = express();
  private port = serverPort || 3000;

  constructor() {
    this.start();
    this.middlewares();
    this.healthy();
    this.routes();
    this.errorHandler();
  }

  start(): void {
    this.listen();
    MongoDb.init();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(compression());

    this.app.use(helmet.contentSecurityPolicy());
    this.app.use(helmet.crossOriginEmbedderPolicy());
    this.app.use(helmet.crossOriginOpenerPolicy());
    this.app.use(helmet.crossOriginResourcePolicy());
    this.app.use(helmet.dnsPrefetchControl());
    this.app.use(helmet.expectCt());
    this.app.use(helmet.frameguard());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.hsts());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.originAgentCluster());
    this.app.use(helmet.permittedCrossDomainPolicies());
    this.app.use(helmet.referrerPolicy());
    this.app.use(helmet.xssFilter());
  }

  healthy(): void {
    this.app.get(
      '/',
      async (_req: Request, res: Response): Promise<Response> => {
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

  routes(): void {
    this.app.use('/user', userRoutes);
  }

  errorHandler(): void {
    this.app.use(errorHandler);
  }
}

new App();
