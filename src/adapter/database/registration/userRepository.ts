import { PrismaClient, Prisma } from '@prisma/client';
import { RegistrationError } from '../../../common/util/errors/errors';
import { LoginDto } from '../../../modules/login/dto/registration/login';
import { UserDto } from '../../../modules/login/dto/registration/user';
import { IUserRepository } from '../../../modules/login/repository/IUserRepository';

export class UserRepository implements IUserRepository {
  private _prismaClient;

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

  public async Update(user: UserDto): Promise<UserDto> {
    const updatedUser = await this._prismaClient.user
      .update({
        where: { email: user.email },
        data: { name: user.name, password: user.password },
      })
      .catch((err) => {
        throw new Error(RegistrationError.COULD_NOT_UPDATE_USER + <string>err);
      });

    return updatedUser;
  }

  public async Delete(email: string): Promise<void> {
    await this._prismaClient.user.delete({
      where: {
        email: email,
      },
    }).catch((err) => {
      throw new Error(RegistrationError.COULD_NOT_DELETE_USER + <string>err);
    });
  }
}
