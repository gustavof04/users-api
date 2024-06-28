import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attractions } from '../../domain/entities/attractions.entity';
import { Result, ResultType } from 'shared/helpers/result';
import { IDeleteAttraction } from '../../domain/useCases/IDeleteAttraction';

@Injectable()
export class DeleteAttraction implements IDeleteAttraction {
  constructor(
    @InjectRepository(Attractions)
    private readonly _attractionsRepository: Repository<Attractions>,
  ) {}

  public async Execute(id: number): Promise<ResultType<boolean>> {
    try {
      const attraction = await this._attractionsRepository.findOneBy({ id });

      if (attraction === null) {
        return Result.NotFound<boolean>(
          false,
          'touristAttraction.deleted.error.notFound',
        );
      }

      await this._attractionsRepository.remove(attraction);

      return Result.Ok<boolean>(true, 'touristAttraction.deleted.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(false, errorMessage);
    }
  }
}
