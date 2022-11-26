import express from 'express';

export class Server {
  private _host?: string;
  private _port?: string;
  private _express: express.Express;

  public constructor() {
    this._host = process.env.HOST;
    this._port = process.env.PORT;
    this._express = express();
  }

  public Run = (): void => {
    this._express.listen(this._port, () => {
      console.log('listening on port ' + this._port);
    });
  };
}
