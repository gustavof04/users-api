import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../domain/entities/user.entity';
import { Result, ResultType } from 'shared/helpers/result';
import { IFindUserById } from 'src/users/domain/useCases/IFindUserById';

@Injectable()
export class FindUserById implements IFindUserById {
  constructor(
    @InjectRepository(Users)
    private readonly _usersRepository: Repository<Users>,
  ) {}

  public async Execute(id: string): Promise<ResultType<Users | null>> {
    try {
      if (!this.isValidUUID(id)) {
        return Result.OperationalError(null, 'user.get.error.invalid.format');
      }

      const user = await this._usersRepository.findOneBy({ id });

      if (!user) {
        return Result.NotFound(null, 'user.get.error.notFound');
      }

      return Result.Ok<Users>(user, 'user.get.success');
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
