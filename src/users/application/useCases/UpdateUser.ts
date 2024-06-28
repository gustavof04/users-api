import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../domain/entities/user.entity';
import { UpdateUserDTO } from 'src/users/domain/dtos/UpdateUserDTO';
import { Result, ResultType } from 'shared/helpers/result';
import { IUpdateUser } from 'src/users/domain/useCases/IUpdateUser';

@Injectable()
export class UpdateUser implements IUpdateUser {
  constructor(
    @InjectRepository(Users)
    private readonly _usersRepository: Repository<Users>,
  ) {}

  public async Execute(
    id: string,
    input: UpdateUserDTO,
  ): Promise<ResultType<Users | null>> {
    try {
      if (!this.isValidUUID(id)) {
        return Result.OperationalError(
          null,
          'user.updated.error.invalid.format',
        );
      }

      const existingUser = await this._usersRepository.findOneBy({
        email: input.email,
      });

      const updatedUser = await this._usersRepository.findOneBy({ id });

      if (existingUser) {
        return Result.OperationalError(null, 'user.error.alreadyExists');
      }

      if (!updatedUser) {
        return Result.NotFound(null, 'user.updated.error.notFound');
      }

      Object.assign(updatedUser, input);
      await this._usersRepository.save(updatedUser);

      return Result.Ok<Users>(updatedUser, 'user.updated.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}
