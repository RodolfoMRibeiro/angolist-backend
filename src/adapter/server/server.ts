import express from 'express';
import { Env } from '../../common/env/env';

export class Server {
  public app: express.Application;
  private _port: string;

  public constructor() {
    this._port = Env.PORT;
    this.app = express();
    this._config();
  }

  public Start(): void {
    this.app.listen(this._port, () => {
      console.log(`Server listening in port ${this._port}`);
    });
  }

  private _config = (): void => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this._loadHealthRoute();
  };

  private _loadHealthRoute = (): void => {
    this.app.get('/health', (req, res) => {
      res.status(200).send({message: `I am alive, DON'T PANIC!`});
    })
  }
}
