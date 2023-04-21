import express, { Application } from 'express';

export class Server {
  public app: express.Application;
  private _port: number;

  constructor(port = 8080) {
    this._port = port;
    this.app = express();
    this._configureMiddleware();
  }

  public Start(): void {
    this.app.listen(this._port, () => {
      console.log(`Server listening in port ${this._port}`);
    });
  }

  private _configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private _configureRoutes(): void {}
}
