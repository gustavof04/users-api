import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  readonly id?: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  readonly createdAt?: string;
}
