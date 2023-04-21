import * as bcrypt from 'bcrypt';
import { MiddlewareError } from '../../common/util/errors/middleware';

export class Encryptor {
  private static readonly _saltRounds: number = 10;

  public static HashPassword = async (password: string): Promise<string> => {
    try {
      const hashedPassword = await bcrypt.hash(password, this._saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error(`${MiddlewareError.COULD_NOT_GENERATE_HASH}: ${error}`);
    }
  };

  public static ComparePasswordWithHash = async (
    currentPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> => {
    try {
      const isSamePassword = await bcrypt.compare(
        currentPassword,
        encryptedPassword,
      );
      return isSamePassword;
    } catch (error) {
      throw new Error(`${MiddlewareError.COULD_NOT_VALIDATE_HASH}: ${error}`);
    }
  };
}
