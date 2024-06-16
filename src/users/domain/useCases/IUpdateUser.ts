import { type ResultType } from 'shared/helpers/result';
import { type UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { type Users } from '../entities/user.entity';

export abstract class IUpdateUser {
  Execute: (
    id: string,
    input: UpdateUserDTO,
  ) => Promise<ResultType<Users | null>>;
}
