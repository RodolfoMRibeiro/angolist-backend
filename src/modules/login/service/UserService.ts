import { UserDto } from '../dto/user';

export interface IUserService {
  create(user: UserDto): Promise<void>;
}
