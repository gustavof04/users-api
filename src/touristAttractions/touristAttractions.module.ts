import { Module } from '@nestjs/common';
import { TouristAttractionsController } from './presentation/touristAttractions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICreateAttraction } from './domain/useCases/ICreateAttraction';
import { CreateAttraction } from './application/useCases/CreateAttraction';
import { IFindAttractionById } from './domain/useCases/IFindAttractionById';
import { FindAttractionById } from './application/useCases/FindAttractionById';
import { IFindAllAttractions } from './domain/useCases/IFindAllAttractions';
import { FindAllAttractions } from './application/useCases/FindAllAttractions';
import { IUpdateAttraction } from './domain/useCases/IUpdateAttraction';
import { UpdateAttraction } from './application/useCases/UpdateAttraction';
import { IDeleteAttraction } from './domain/useCases/IDeleteAttraction';
import { DeleteAttraction } from './application/useCases/DeleteAttraction';
import { Attractions } from './domain/entities/attractions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attractions])],
  controllers: [TouristAttractionsController],
  providers: [
    {
      provide: ICreateAttraction,
      useClass: CreateAttraction,
    },
    {
      provide: IFindAttractionById,
      useClass: FindAttractionById,
    },
    {
      provide: IFindAllAttractions,
      useClass: FindAllAttractions,
    },
    {
      provide: IUpdateAttraction,
      useClass: UpdateAttraction,
    },
    {
      provide: IDeleteAttraction,
      useClass: DeleteAttraction,
    },
  ],
})
export class TouristAttractionsModule {}
