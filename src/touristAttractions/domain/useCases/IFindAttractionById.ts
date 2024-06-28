import { type ResultType } from 'shared/helpers/result';
import { type Attractions } from '../entities/attractions.entity';

export abstract class IFindAttractionById {
  Execute: (id: number) => Promise<ResultType<Attractions | null>>;
}
