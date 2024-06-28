import { type ResultType } from 'shared/helpers/result';

export abstract class IDeleteAttraction {
  Execute: (id: number) => Promise<ResultType<boolean>>;
}
