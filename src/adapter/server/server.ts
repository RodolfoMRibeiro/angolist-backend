import express from 'express';

export class Server {
  private _host?: string;
  private _port?: string;
  public Express: express.Express;

  public constructor() {
    this._host = process.env.HOST;
    this._port = process.env.PORT;
    this.Express = express();
  }

  public Run = (): void => {
    this.Express.listen(this._port, () => {
      console.log('listening on port ' + this._port);
    });
  };
}
