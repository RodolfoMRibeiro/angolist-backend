import express from 'express';
import { Env } from '../../common/env/env';

export class Server {
  private _host?: string;
  private _port?: string;
  private _express: express.Express;

  public constructor() {
    this._host = Env.HOST;
    this._port = Env.PORT;
    this._express = express();
  }

  public Run = (): void => {
    this._express.listen(this._port, () => {
      console.log('listening on port ' + this._port);
    });
  };
}
