import { type ResultType } from 'shared/helpers/result';
import { type CreateAttractionDTO } from '../dtos/CreateAttractionDTO';
import { type Attractions } from '../entities/attractions.entity';

export abstract class ICreateAttraction {
  Execute: (
    input: CreateAttractionDTO,
  ) => Promise<ResultType<Attractions | null>>;
}
