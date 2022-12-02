import { UserDto } from '../dto/user';
import { UserService } from './UserServiceClass';
import { IUserRepository } from '../repository/userRepository';

export const NewService = (repository: IUserRepository): IUserService => {
  return new UserService(repository);
};

export interface IUserService {
  create(user: UserDto): Promise<void>;
}
