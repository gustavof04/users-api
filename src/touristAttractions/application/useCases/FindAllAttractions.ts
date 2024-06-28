import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attractions } from '../../domain/entities/attractions.entity';
import { Result, ResultType } from 'shared/helpers/result';
import { IFindAllAttractions } from '../../domain/useCases/IFindAllAttractions';

@Injectable()
export class FindAllAttractions implements IFindAllAttractions {
  constructor(
    @InjectRepository(Attractions)
    private readonly _attractionsRepository: Repository<Attractions>,
  ) {}

  public async Execute(): Promise<ResultType<Attractions[] | null>> {
    try {
      const attractions = await this._attractionsRepository.find();

      return Result.Ok<Attractions[]>(
        attractions,
        'touristAttractions.getAll.success',
      );
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }
}
