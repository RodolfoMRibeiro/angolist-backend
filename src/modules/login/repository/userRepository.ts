import { UserDto } from '../dto/user';

export interface IUserRepository {
  create(user: UserDto): void;
}
