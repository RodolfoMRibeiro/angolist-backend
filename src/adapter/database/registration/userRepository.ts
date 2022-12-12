import { PrismaClient, Prisma } from '@prisma/client';
import { RegistrationError } from '../../../common/util/errors/errors';
import { UserDto } from '../../../modules/login/dto/user';

export class UserRepository {
  private readonly _prismaClient;

  constructor() {
    this._prismaClient = new PrismaClient();
  }

  public create = async (user: UserDto): Promise<void> => {
    const userModel = <Prisma.UserCreateInput>user;

    await this._prismaClient.user
      .create({ data: userModel })
      .catch(async (err) => {
        throw new Error(RegistrationError.COULD_NOT_CREATE_USER + err);
      });
  };
}