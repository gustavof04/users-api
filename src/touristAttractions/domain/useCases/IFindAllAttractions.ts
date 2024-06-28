import { type ResultType } from 'shared/helpers/result';
import { type Attractions } from '../entities/attractions.entity';

export abstract class IFindAllAttractions {
  Execute: () => Promise<ResultType<Attractions[] | null>>;
}
