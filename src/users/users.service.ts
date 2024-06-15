import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { CreateUserDTO } from './dto/users.dto';
import { Result, ResultType } from 'shared/helpers/result';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAllUsers(): Promise<ResultType<Users[] | null>> {
    try {
      const users = await this.usersRepository.find();

      return Result.Ok<Users[]>(users, 'users.getAll.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }

  async findUserById(id: string): Promise<ResultType<Users | null>> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        return Result.NotFound(null, 'user.not.found');
      }

      return Result.Ok<Users>(user, 'user.get.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }

  async createUser(
    userDTO: CreateUserDTO,
  ): Promise<ResultType<CreateUserDTO | null>> {
    try {
      const createdUser = await this.usersRepository.save(userDTO);
      return Result.Created<Users>(createdUser, 'user.created.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }
}
