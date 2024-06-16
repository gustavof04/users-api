import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { Result, ResultType } from 'shared/helpers/result';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly _usersRepository: Repository<Users>,
  ) {}

  public async findAllUsers(): Promise<ResultType<Users[] | null>> {
    try {
      const users = await this._usersRepository.find();

      return Result.Ok<Users[]>(users, 'users.getAll.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }

  public async findUserById(id: string): Promise<ResultType<Users | null>> {
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

  public async createUser(
    userDTO: CreateUserDTO,
  ): Promise<ResultType<CreateUserDTO | null>> {
    try {
      const existingUser = await this._usersRepository.findOneBy({
        email: userDTO.email,
      });
      if (existingUser) {
        return Result.OperationalError(null, 'user.email.alreadyExists');
      }

      const createdUser = await this._usersRepository.save(userDTO);
      return Result.Created<Users>(createdUser, 'user.created.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }

  public async updateUser(
    id: string,
    userDTO: UpdateUserDTO,
  ): Promise<ResultType<UpdateUserDTO | null>> {
    try {
      if (!this.isValidUUID(id)) {
        return Result.OperationalError(
          null,
          'user.updated.error.invalid.format',
        );
      }

      const updatedUser = await this._usersRepository.findOneBy({ id });

      if (!updatedUser) {
        return Result.NotFound(null, 'user.updated.error.notFound');
      }

      Object.assign(updatedUser, userDTO);
      await this._usersRepository.save(updatedUser);

      return Result.Ok<Users>(updatedUser, 'user.updated.success');
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }

  public async deleteUser(id: string): Promise<ResultType<Users | null>> {
    try {
      if (!this.isValidUUID(id)) {
        return Result.OperationalError(
          null,
          'user.deleted.error.invalid.format',
        );
      }

      const user = await this._usersRepository.findOneBy({ id });

      if (!user) {
        return Result.NotFound(null, 'user.deleted.error.notFound');
      }

      await this._usersRepository.remove(user);

      return Result.Ok<Users>(user, 'user.deleted.success');
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
