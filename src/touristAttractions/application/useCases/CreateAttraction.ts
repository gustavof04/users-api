import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attractions } from '../../domain/entities/attractions.entity';
import { Result, ResultType } from 'shared/helpers/result';
import { CreateAttractionDTO } from '../../domain/dtos/CreateAttractionDTO';
import { ICreateAttraction } from '../../domain/useCases/ICreateAttraction';

@Injectable()
export class CreateAttraction implements ICreateAttraction {
  constructor(
    @InjectRepository(Attractions)
    private readonly _attractionRepository: Repository<Attractions>,
  ) {}

  public async Execute(
    input: CreateAttractionDTO,
  ): Promise<ResultType<Attractions | null>> {
    try {
      const existingAttraction = await this._attractionRepository.findOneBy({
        name: input.name,
      });
      if (existingAttraction) {
        return Result.OperationalError(
          null,
          'touristAttraction.error.alreadyExists',
        );
      }

      const createdAttraction = await this._attractionRepository.save(input);
      return Result.Created<Attractions>(
        createdAttraction,
        'touristAttraction.created.success',
      );
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }
}
