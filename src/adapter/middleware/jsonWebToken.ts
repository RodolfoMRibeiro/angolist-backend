import * as express from 'express';
import jwt from 'jsonwebtoken';

export class WebToken {
  public static generateAccessToken = (username: string): string => {
    console.log(process.env.TOKEN_SECRET);
    return jwt.sign(username, process.env.TOKEN_SECRET as jwt.Secret);
  };

  public static authenticateToken = (
    request: express.Request,
    response: express.Response,
    nextFunction: express.NextFunction,
  ): express.Response | void => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      const unauthorizedStatusCode = 401;
      return response.sendStatus(unauthorizedStatusCode);
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (error) => {
      if (error == null) {
        const forbiddenStatusCode = 403;
        return response.sendStatus(forbiddenStatusCode);
      }
    });

    nextFunction();
  };
}
