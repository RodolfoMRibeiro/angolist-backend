import express from 'express';
import { Env } from '../../common/env/env';

export class Server {
  public app: express.Application;
  private _port: string;

  public constructor() {
    this._port = Env.PORT;
    this.app = express();
    this.config();
  }

  public start(): void {
    this.app.listen(this._port, () => {
      console.log(`Server listening in port ${this._port}`);
    });
  }

  private config = (): void => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  };
}
