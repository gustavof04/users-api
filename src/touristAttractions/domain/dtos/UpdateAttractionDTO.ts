import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class UpdateAttractionDTO {
  readonly id?: number;

  @ApiProperty()
  @IsString({ message: 'Nome inválido' })
  @Length(3, 50, { message: 'Nome deve ter de 3 a 50 caracteres' })
  readonly name: string;

  @ApiProperty()
  @IsString({ message: 'Descrição inválida' })
  @Length(3, 255, { message: 'Descrição deve ter de 3 a 255 caracteres' })
  readonly description?: string;

  @ApiProperty()
  @IsString({ message: 'Localização inválida' })
  @Length(3, 255, { message: 'Localização deve ter de 3 a 255 caracteres' })
  readonly location: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly averageRating?: number;

  @ApiProperty()
  readonly latitude?: string;

  @ApiProperty()
  readonly longitude?: string;

  readonly updatedAt?: string;
}
