import express from 'express';
import { Env } from '../../common/env/env';

export class Server {
  private _port: string;
  private _app: express.Application;

  public constructor() {
    this._port = Env.PORT;
    this._app = express();
    this.config();
  }

  private config = (): void => {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
  };

  public start(): void {
    this._app.listen(this._port, () => {
      console.log(`Server listening in port ${this._port}`);
    });
  }
}
