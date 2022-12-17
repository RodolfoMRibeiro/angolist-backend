import * as dotenv from 'dotenv';
import { EnvError } from '../util/errors/errors';

export class Env {
  public static TOKEN_SECRET: string;
  public static DATABASE_URL: string;
  public static HOST: string;
  public static PORT: string;

  public static Load = (): void => {
    dotenv.config({ path: __dirname + '/../../../.env' });
    this._loadEnvironmentsVariables();
    this._panicIfNotExists();
  };

  private static _loadEnvironmentsVariables = (): void => {
    this.TOKEN_SECRET = <string>process.env.TOKEN_SECRET;
    this.DATABASE_URL = <string>process.env.DATABASE_URL;
    this.HOST = <string>process.env.HOST;
    this.PORT = <string>process.env.PORT;
  };

  private static _panicIfNotExists() {
    if (this.TOKEN_SECRET === undefined) this._panic();
    if (this.DATABASE_URL === undefined) this._panic();
    if (this.HOST === undefined) this._panic();
    if (this.PORT === undefined) this._panic();
  }

  private static _panic(message?: string) {
    const exitCode = 1;
    process.kill(exitCode, message ?? EnvError.MISSING_ENVIRONMENT_VARIABLE);
  }
}
