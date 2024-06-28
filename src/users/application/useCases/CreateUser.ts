import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../domain/entities/user.entity';
import { Result, ResultType } from 'shared/helpers/result';
import { CreateUserDTO } from '../../domain/dtos/CreateUserDTO';
import { ICreateUser } from 'src/users/domain/useCases/ICreateUser';

@Injectable()
export class CreateUser implements ICreateUser {
  constructor(
    @InjectRepository(Users)
    private readonly _usersRepository: Repository<Users>,
  ) {}

  public async Execute(
    input: CreateUserDTO,
  ): Promise<ResultType<Users | null>> {
    try {
      const existingUser = await this._usersRepository.findOneBy({
        email: input.email,
      });
      if (existingUser) {
        return Result.OperationalError(null, 'user.error.alreadyExists');
      }

      const createdUser = await this._usersRepository.save(input);
      return Result.Created<Users>(createdUser, 'user.created.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }
}
