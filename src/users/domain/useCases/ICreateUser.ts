import { type ResultType } from 'shared/helpers/result';
import { type CreateUserDTO } from '../dtos/CreateUserDTO';
import { type Users } from '../entities/user.entity';

export abstract class ICreateUser {
  Execute: (input: CreateUserDTO) => Promise<ResultType<Users | null>>;
}
