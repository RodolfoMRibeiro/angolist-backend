import * as express from 'express';
import jwt from 'jsonwebtoken';
import { Login } from '../../common/types/login';

export class Middleware {
  public static generateAccessToken = (login: Login): string => {
    try {
      return jwt.sign(login, process.env.TOKEN_SECRET as jwt.Secret, {
        expiresIn: '2h',
      });
    } catch (e) {
      throw new Error('MISSING ENVIRONMENT VARIABLE');
    }
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
      if (error != null) {
        const forbiddenStatusCode = 403;
        return response.sendStatus(forbiddenStatusCode);
      }
    });
    nextFunction();
  };
}
