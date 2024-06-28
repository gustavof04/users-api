import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attractions } from '../../domain/entities/attractions.entity';
import { UpdateAttractionDTO } from '../../domain/dtos/UpdateAttractionDTO';
import { Result, ResultType } from 'shared/helpers/result';
import { IUpdateAttraction } from '../../domain/useCases/IUpdateAttraction';

@Injectable()
export class UpdateAttraction implements IUpdateAttraction {
  constructor(
    @InjectRepository(Attractions)
    private readonly _attractionsRepository: Repository<Attractions>,
  ) {}

  public async Execute(
    id: number,
    input: UpdateAttractionDTO,
  ): Promise<ResultType<Attractions | null>> {
    try {
      const existingAttraction = await this._attractionsRepository.findOneBy({
        name: input.name,
      });

      const updatedAttraction = await this._attractionsRepository.findOneBy({
        id,
      });

      if (existingAttraction) {
        return Result.OperationalError(
          null,
          'touristAttraction.error.alreadyExists',
        );
      }

      if (!updatedAttraction) {
        return Result.NotFound(
          null,
          'touristAttraction.updated.error.notFound',
        );
      }

      Object.assign(updatedAttraction, input);
      await this._attractionsRepository.save(updatedAttraction);

      return Result.Ok<Attractions>(
        updatedAttraction,
        'touristAttraction.updated.success',
      );
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }
}
