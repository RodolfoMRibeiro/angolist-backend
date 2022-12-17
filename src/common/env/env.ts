import * as dotenv from 'dotenv';
import { EnvError } from '../util/errors/errors';

export class Env {
  public static SECRET_TOKEN: string;
  public static DATABASE_URL: string;
  public static RENDER_EXTERNAL_HOSTNAME: string;
  public static PORT: string;

  public static Load = (): void => {
    dotenv.config({ path: __dirname + '/../../../.env' });
    this._loadEnvironmentsVariables();
    this._panicIfNotExists();
  };

  private static _loadEnvironmentsVariables = (): void => {
    this.SECRET_TOKEN = <string>process.env.SECRET_TOKEN;
    this.DATABASE_URL = <string>process.env.DATABASE_URL;
    this.RENDER_EXTERNAL_HOSTNAME = <string>process.env.RENDER_EXTERNAL_HOSTNAME;
    this.PORT = <string>process.env.PORT;
  };

  private static _panicIfNotExists() {
    if (this.SECRET_TOKEN === undefined) this._panic();
    if (this.DATABASE_URL === undefined) this._panic();
    if (this.RENDER_EXTERNAL_HOSTNAME === undefined) this._panic();
    if (this.PORT === undefined) this._panic();
  }

  private static _panic(message?: string) {
    const exitCode = 1;
    process.kill(exitCode, message ?? EnvError.MISSING_ENVIRONMENT_VARIABLE);
  }
}
