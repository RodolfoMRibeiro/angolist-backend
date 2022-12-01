import * as dotenv from 'dotenv';

export class Env {
  public static TOKEN_SECRET: string;
  public static DATABASE_URL: string;
  public static HOST: string;
  public static PORT: string;

  public static Load = (): void => {
    dotenv.config({ path: __dirname + '/.env' });
    this.loadEnvironmentsVariables();
  };

  private static loadEnvironmentsVariables = (): void => {
    this.TOKEN_SECRET = <string>process.env.TOKEN_SECRET;
    this.DATABASE_URL = <string>process.env.DATABASE_URL;
    this.HOST = <string>process.env.HOST;
    this.PORT = <string>process.env.PORT;
  };
}
