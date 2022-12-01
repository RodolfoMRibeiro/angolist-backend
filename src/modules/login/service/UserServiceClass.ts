import { UserDto } from '../dto/user';
import { IUserService } from './UserServiceInterface';
import { IUserRepository } from '../repository/userRepository';
import { Encryptor } from '../../../adapter/middleware/encryptor';

export class UserService implements IUserService {
  private _repository: IUserRepository;

  public constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  public create = async (user: UserDto): Promise<void> => {
    try {
      user.password = await Encryptor.HashPassword(user.password);
      await this._repository.create(user);
    } catch (e) {
      throw new Error('COULD NOT CREATE USER');
    }
  };
}
