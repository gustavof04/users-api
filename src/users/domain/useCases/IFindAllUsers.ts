import { type ResultType } from 'shared/helpers/result';
import { type Users } from '../entities/user.entity';

export abstract class IFindAllUsers {
  Execute: () => Promise<ResultType<Users[] | null>>;
}
