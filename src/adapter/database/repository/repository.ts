import { PrismaClient } from '@prisma/client';
import { IBaseRepository } from './interfaces';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected _prismaClient: PrismaClient;

  constructor() {
    this._prismaClient = new PrismaClient();
  }

  public abstract find(item: T): T;
}
