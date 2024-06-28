import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attractions } from '../../domain/entities/attractions.entity';
import { Result, ResultType } from 'shared/helpers/result';
import { IFindAttractionById } from '../../domain/useCases/IFindAttractionById';

@Injectable()
export class FindAttractionById implements IFindAttractionById {
  constructor(
    @InjectRepository(Attractions)
    private readonly _attractionsRepository: Repository<Attractions>,
  ) {}

  public async Execute(id: number): Promise<ResultType<Attractions | null>> {
    try {
      const attraction = await this._attractionsRepository.findOneBy({ id });

      if (!attraction) {
        return Result.NotFound(null, 'touristAttraction.get.error.notFound');
      }

      return Result.Ok<Attractions>(
        attraction,
        'touristAttraction.get.success',
      );
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }
}
