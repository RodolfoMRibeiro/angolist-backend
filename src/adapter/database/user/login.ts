import { PrismaClient, Prisma } from '@prisma/client';

export class UserRepository<T> {
  private readonly _prismaClient;

  constructor() {
    this._prismaClient = new PrismaClient();
  }

  public create = async (user: T): Promise<void> => {
    const userModel = <Prisma.tb_usersCreateInput>user;

    await this._prismaClient.tb_users
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
