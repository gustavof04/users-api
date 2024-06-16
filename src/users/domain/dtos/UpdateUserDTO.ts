import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLowercase, IsString, Length } from 'class-validator';

export class UpdateUserDTO {
  readonly id?: string;

  @ApiProperty()
  @IsString({ message: 'Nome inválido' })
  @Length(3, 50, { message: 'Nome deve ter de 3 a 50 caracteres' })
  readonly name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email inválido' })
  @IsLowercase({ message: 'Email não deve ter caracteres maiúsculos' })
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Senha inválida' })
  @Length(8, 16, { message: 'Senha deve ter de 8 a 16 caracteres' })
  readonly password: string;

  readonly updatedAt?: string;
}
