import { type ResultType } from 'shared/helpers/result';
import { type UpdateAttractionDTO } from '../dtos/UpdateAttractionDTO';
import { type Attractions } from '../entities/attractions.entity';

export abstract class IUpdateAttraction {
  Execute: (
    id: number,
    input: UpdateAttractionDTO,
  ) => Promise<ResultType<Attractions | null>>;
}
