import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { Env } from '../../../config/env/env';
import { Header } from '../../../common/util/constants/constants';
import { HttpError } from '../../../common/util/errors/http';

interface JwtService {
  generateToken(payload: Record<string, any>): string;
  verifyToken(token: string): TokenPayload;
}

interface TokenPayload {
  [key: string]: any;
  exp: number;
}

class JwtMiddleware {
  private readonly _jwtService: JwtService;

  constructor(jwtService: JwtService) {
    this._jwtService = jwtService;
  }

  public AuthenticateToken = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const authHeader = request.headers[Header.AUTHORIZATION];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const decoded = this._jwtService.verifyToken(token);
      if (decoded.exp < Date.now() / 1000) {
        throw new HttpError('Token expired', HttpStatus.FORBIDDEN);
      }
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpError('Token expired', HttpStatus.FORBIDDEN);
      } else if (error instanceof JsonWebTokenError) {
        throw new HttpError('Invalid token', HttpStatus.FORBIDDEN);
      } else {
        throw new HttpError('Unknown error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  };
}

const jwtService: JwtService = {
  generateToken: (payload: Record<string, any>): string => {
    if (!Env.SECRET_TOKEN) {
      throw new Error('Missing environment variable');
    }
    return jwt.sign(payload, Env.SECRET_TOKEN, {
      expiresIn: '2h',
    });
  },

  verifyToken: (token: string): TokenPayload => {
    if (!Env.SECRET_TOKEN) {
      throw new Error('Missing environment variable');
    }
    return jwt.verify(token, Env.SECRET_TOKEN) as TokenPayload;
  },
};

export { JwtMiddleware, jwtService };
