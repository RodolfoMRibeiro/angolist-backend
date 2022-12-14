import * as bcrypt from 'bcrypt';
import { MiddlewareError } from '../../common/util/errors/errors';

export class Encryptor {
  private static readonly _saltRounds: number = 10;

  public static HashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt
      .hash(password, this._saltRounds)
      .then((encryptedPassword) => {
        return encryptedPassword;
      })
      .catch((err) => {
        throw new Error(MiddlewareError.COULD_NOT_GENERATE_HASH + err);
      });

    return hashedPassword;
  };

  public static ComparePasswordWithHash = async (
    currentPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> => {
    const isSamePassword = bcrypt
      .compare(currentPassword, encryptedPassword)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(MiddlewareError.COULD_NOT_VALIDATE_PASSWORD + err);
      });

    return isSamePassword;
  };
}
