import * as dotenv from 'dotenv';
import { EnvError } from '../../common/errors/errors';

export class Env {
  public static SECRET_TOKEN: string;
  public static DATABASE_URL: string;
  public static PORT: string;

  public static Load = (): void => {
    dotenv.config({ path: __dirname + '/../../../.env' });
    this._loadEnvironmentsVariables();
    this._panicIfNotExists();
  };

  private static _loadEnvironmentsVariables = (): void => {
    const env = process.env;

    this.SECRET_TOKEN = <string>env.SECRET_TOKEN;
    this.DATABASE_URL = <string>env.DATABASE_URL;
    this.PORT = <string>env.PORT;
  };

  private static _panicIfNotExists() {
    if (!this.SECRET_TOKEN) this._panic('secret_token');
    if (!this.DATABASE_URL) this._panic('database_url');
    if (!this.PORT) this._panic('port');
  }

  private static _panic(message?: string) {
    const exitCode = 1;
    process.kill(exitCode, message ?? EnvError.MISSING_ENVIRONMENT_VARIABLE);
  }
}
