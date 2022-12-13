import { PrismaClient, Prisma, prisma } from '@prisma/client';
import { RegistrationError } from '../../../common/util/errors/errors';
import { LoginDto } from '../../../modules/login/dto/login';
import { UserDto } from '../../../modules/login/dto/user';
import { IUserRepository } from '../../../modules/login/repository/userRepository';

export class UserRepository implements IUserRepository {
  private readonly _prismaClient;

  constructor() {
    this._prismaClient = new PrismaClient();
  }

  public async Create(user: UserDto): Promise<void> {
    const userModel = <Prisma.UserCreateInput>user;

    await this._prismaClient.user.create({ data: userModel }).catch((err) => {
      throw new Error(RegistrationError.COULD_NOT_CREATE_USER + <string>err);
    });
  }

  public async Login(email: string): Promise<LoginDto> {
    const userLogin = <LoginDto>await this._prismaClient.user
      .findUnique({
        where: {
          email: email,
        },
      })
      .catch((err) => {
        throw new Error(RegistrationError.COULD_NOT_FIND_USER + <string>err);
      });

    return userLogin;
  }
}
