import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  readonly id?: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  readonly updatedAt?: string;
}
