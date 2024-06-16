import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../domain/entities/user.entity';
import { Result, ResultType } from 'shared/helpers/result';
import { IDeleteUser } from 'src/users/domain/useCases/IDeleteUser';

@Injectable()
export class DeleteUser implements IDeleteUser {
  constructor(
    @InjectRepository(Users)
    private readonly _usersRepository: Repository<Users>,
  ) {}

  public async Execute(id: string): Promise<ResultType<boolean>> {
    try {
      if (!this.isValidUUID(id)) {
        return Result.OperationalError(
          null,
          'user.deleted.error.invalid.format',
        );
      }

      const user = await this._usersRepository.findOneBy({ id });

      if (user === null) {
        return Result.NotFound<boolean>(false, 'user.deleted.error.notFound');
      }

      await this._usersRepository.remove(user);

      return Result.Ok<boolean>(true, 'user.deleted.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(false, errorMessage);
    }
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}
