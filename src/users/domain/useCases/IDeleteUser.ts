import { type ResultType } from 'shared/helpers/result';

export abstract class IDeleteUser {
  Execute: (id: string) => Promise<ResultType<boolean>>;
}
