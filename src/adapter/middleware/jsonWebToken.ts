import jwt from 'jsonwebtoken';

export class Jwt {
  private static _TOKEN_SECRET: jwt.Secret = process.env.TOKEN_SECRET ?? '';

  public static generateAccessToken(username: string): string {
    return jwt.sign(username, this._TOKEN_SECRET);
  }
}
