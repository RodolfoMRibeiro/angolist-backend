import express, { Application, Router } from 'express';

export class Server {
  private _app!: Application;
  private _port: number;

  constructor(port = 8080) {
    this._port = port;
    this._app = express();
    this._configureMiddleware();
  }

  public Start(): void {
    this._app.listen(this._port, () => {
      console.log(`Server listening in port ${this._port}`);
    });
  }

  private _addRouter(router: Router): void {
    this._app.use('/api', router);
  }

  private _configureMiddleware(): void {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
  }

  private _configureRoutes(): void {}
}
