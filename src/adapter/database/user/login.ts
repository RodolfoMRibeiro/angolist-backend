import { PrismaClient, Prisma } from '@prisma/client';
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
      .then(async () => {
        this._prismaClient.$disconnect();
      })
      .catch(async (e) => {
        const exitCode = 1;
        console.error(e);

        await this._prismaClient.$disconnect();
        process.exit(exitCode);
      });
  };
}
