import { ILogin } from '../dto/login';
import { UserDto } from '../dto/user';

export interface IUserService {
  create(user: UserDto): void;
}
