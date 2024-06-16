import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../domain/entities/user.entity';
import { Result, ResultType } from 'shared/helpers/result';
import { IFindAllUsers } from 'src/users/domain/useCases/IFindAllUsers';

@Injectable()
export class FindAllUsers implements IFindAllUsers {
  constructor(
    @InjectRepository(Users)
    private readonly _usersRepository: Repository<Users>,
  ) {}

  public async Execute(): Promise<ResultType<Users[] | null>> {
    try {
      const users = await this._usersRepository.find();

      return Result.Ok<Users[]>(users, 'users.getAll.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }
}
