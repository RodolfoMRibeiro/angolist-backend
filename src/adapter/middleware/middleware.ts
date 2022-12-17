import * as express from 'express';
import jwt from 'jsonwebtoken';
import { LoginDto } from '../../modules/login/dto/registration/login';
import { Header, Str } from '../../common/util/constants/constants';
import { Env } from '../../common/env/env';
import { EnvError } from '../../common/util/errors/errors';

export class Middleware {
  public static generateAccessToken = (login: LoginDto): string => {
    try {
      return jwt.sign(login, <jwt.Secret>Env.TOKEN_SECRET, {
        expiresIn: '2h',
      });
    } catch (e) {
      throw new Error(EnvError.MISSING_ENVIRONMENT_VARIABLE);
    }
  };

  public static authenticateToken = (
    request: express.Request,
    response: express.Response,
    nextFunction: express.NextFunction,
  ): express.Response | void => {
    const authHeader = request.headers[Header.AUTHORIZATION];
    const token = authHeader && authHeader.split(Str.EMPTY_SPACE)[1];

    if (token == null) {
      const unauthorizedStatusCode = 401;
      return response.sendStatus(unauthorizedStatusCode);
    }

    jwt.verify(token, <jwt.Secret>Env.TOKEN_SECRET, (error) => {
      if (error != null) {
        const forbiddenStatusCode = 403;
        return response.sendStatus(forbiddenStatusCode);
      }
    });
    nextFunction();
  };
}
