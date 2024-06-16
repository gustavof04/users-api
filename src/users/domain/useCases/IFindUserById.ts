import { type ResultType } from 'shared/helpers/result';
import { type Users } from '../entities/user.entity';

export abstract class IFindUserById {
  Execute: (id: string) => Promise<ResultType<Users | null>>;
}
